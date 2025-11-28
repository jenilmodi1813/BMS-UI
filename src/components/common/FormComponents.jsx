import React from "react";
import { AlertCircle } from "lucide-react";

export const InputField = ({ label, name, type = "text", value, onChange, error, icon: Icon, placeholder, ...props }) => (
    <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`block w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 bg-gray-50 border ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                placeholder={placeholder}
                {...props}
            />
        </div>
        {error && (
            <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {error}
            </div>
        )}
    </div>
);

export const SectionHeader = ({ title, icon: IconComponent }) => (
    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
        <div className="p-2 bg-blue-50 rounded-lg">
            <IconComponent className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
);
