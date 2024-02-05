import React, { useState, useEffect, useCallback } from "react";
import { databases } from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { Trash2 } from "react-feather";
import client from "../appwriteConfig";

export const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let payload = {
        body: messageBody,
      };

      databases
        .createDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_COLLECTION_ID,
          ID.unique(),
          payload
        )
        .then((response) => {
          //   setMessages((prev) => [response, ...prev]);
          //   setMessageBody("");
        });
    },
    [messageBody]
  );

  const getMessages = async () => {
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );
    console.log("response from getMsg: ", response);
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      message_id
    );
    // setMessages((prev) =>
    //   messages.filter((message) => message.$id !== message_id)
    // );
  };

  const dateString = (createdAt) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const createDate = new Date(createdAt);

    if (isSameDay(today, createDate)) {
      return `Today ${createDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (isSameDay(yesterday, createDate)) {
      return `Yesterday ${createDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return (
        createDate.toLocaleDateString() +
        " " +
        createDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  };

  // Helper function to check if two dates represent the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  useEffect(() => {
    getMessages();

    // Subscribing database and the particular collection for Real Time Communication
    const unSubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
        import.meta.env.VITE_COLLECTION_ID
      }.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        // console.log("Real Time :=>", response);

        // for realtime create
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prev) => [response.payload, ...prev]);
          setMessageBody("");
          console.log("A Message is created");
        }

        // for realtime delete
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A Message is deleted");

          setMessages((prev) => {
            return messages.filter(
              (message) => message.$id !== response.payload.$id
            );
          });
        }
      }
    );

    return () => {
      unSubscribe();
    };
  }, [handleSubmit]);

  return (
    <main className="container">
      <div className="room--container">
        <div>
          {messages
            .map((message) => (
              <div key={message.$id} className="message--wrapper">
                <div className="message--body">
                  <span>{message.body}</span>
                </div>
                <div>
                  <div className="message--header">
                    <p className="message-timestamp">
                      {dateString(message.$createdAt)}
                    </p>
                    <div>
                      <Trash2
                        className="delete--btn"
                        onClick={() => deleteMessage(message.$id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>

      <form id="message--form" onSubmit={handleSubmit}>
        <div>
          <textarea
            required
            maxlength="250"
            placeholder="Say something..."
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            value={messageBody}
          ></textarea>
        </div>

        <div className="send-btn--wrapper">
          <input className="btn btn--secondary" type="submit" value="send" />
        </div>
      </form>
    </main>
  );
};