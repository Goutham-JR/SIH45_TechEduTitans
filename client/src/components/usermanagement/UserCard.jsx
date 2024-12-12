// components/UserManagement/UserCard.js
import React from "react";
import { CheckCircle, XCircle, UserX, Lock } from "lucide-react";

function UserCard({ user, updateUserStatus, deactivateStudentLogin }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col cursor-pointer transform transition-all hover:scale-105">
      <img
        src={user.picture}
        alt={`${user.name}'s Profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
      <p className="text-sm mb-1">
        <strong>Role:</strong> {user.role}
      </p>
      <p className="text-sm mb-1">
        <strong>Status:</strong>{" "}
        <span
          className={`font-bold ${
            user.status === "Accepted"
              ? "text-green-400"
              : user.status === "Rejected"
              ? "text-red-400"
              : user.status === "Pending"
              ? "text-yellow-400"
              : user.status === "Deactivated"
              ? "text-gray-400"
              : "text-gray-400"
          }`}
        >
          {user.status}
        </span>
      </p>
      <p className="text-sm mb-1">
        <strong>Applied At:</strong> {user.appliedAt}
      </p>
      <div className="flex gap-2 mt-auto">
        {!user.isStudent && user.status === "Pending" && (
          <>
            <button
              onClick={() => updateUserStatus(user.id, "Accepted")}
              className="flex items-center gap-2 px-3 py-1.5 text-base bg-green-600 rounded-lg hover:bg-green-500 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Accept
            </button>
            <button
              onClick={() => updateUserStatus(user.id, "Rejected")}
              className="flex items-center gap-2 px-3 py-1.5 text-base bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </>
        )}
        {user.status === "Accepted" && !user.isStudent && (
          <button
            onClick={() => updateUserStatus(user.id, "Retired")}
            className="flex items-center gap-2 px-3 py-1.5 text-base bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
          >
            <UserX className="w-4 h-4" />
            Retire
          </button>
        )}
        {user.isStudent && user.status !== "Deactivated" && (
          <button
            onClick={() => deactivateStudentLogin(user.id)}
            className="flex items-center gap-2 px-3 py-1.5 text-base bg-yellow-600 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            <Lock className="w-4 h-4" />
            Block Login
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
