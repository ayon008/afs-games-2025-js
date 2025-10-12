"use client"
import useGetSessionHistory from "@/js/GetSessionHistory";
import React from "react";

const Session = ({ uid }) => {
  const { sessionHistory, isLoading, isError, error } = useGetSessionHistory(uid);

  return (
    <div className="lg:my-20 my-10">
      <h2 className="font-semibold 2xl:text-5xl xl:text-3xl">
        Your Session History
      </h2>
      <p className="2xl:text-2xl xl:text-lg 2xl:mt-14 xl:mt-7 font-semibold">
        Your Uploaded Sessions
      </p>
      <div className="mt-10 lg:w-1/2 w-full overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>File Name</th>
              <th>Category</th>
              <th>Time</th>
              <th>Distance</th>
            </tr>
          </thead>
          {isLoading && (
            <tbody>
              <tr>
                <td colSpan={5}>Loading session history...</td>
              </tr>
            </tbody>
          )}

          {isError && (
            <tbody>
              <tr>
                <td colSpan={5}>Error loading session history: {error?.message}</td>
              </tr>
            </tbody>
          )}

          {!isLoading && !isError && (
            <tbody>
              {Array.isArray(sessionHistory) && sessionHistory.length > 0 ? (
                sessionHistory.map((singleHistory, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{singleHistory.filename}</td>
                    <td className="uppercase font-semibold">{singleHistory.category ?? ''}</td>
                    <td>{singleHistory.totalTime.toFixed(2) ?? singleHistory.time.toFixed(2) ?? ''} Hours</td>
                    <td>{singleHistory?.distance?.toFixed(2) ?? ''} Km</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No sessions uploaded yet.</td>
                </tr>
              )}
            </tbody>
          )}

        </table>
      </div>
    </div>
  );
};

export default Session;
