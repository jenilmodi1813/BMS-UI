import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const AccountCard = ({ account, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{account.accountNumber}</h3>
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(account)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(account.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-gray-600"><span className="font-medium">Type:</span> {account.accountType}</p>
      <p className="text-gray-600"><span className="font-medium">Status:</span> {account.status}</p>
      <p className="text-gray-600"><span className="font-medium">Balance:</span> ${account.balance.toFixed(2)}</p>
    </div>
  );
};

export default AccountCard;
