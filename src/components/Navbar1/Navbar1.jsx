// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar1 = () => {
//   return (
//     <nav className="w-full bg-gray-100 md:px-[100px] px-5 flex justify-between py-4 items-center shadow-sm">
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-2 cursor-pointer">
//         <h3 className="text-blue-500 font-bold text-3xl">BankMate</h3>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/3077/3077193.png"
//           alt="Bank Logo"
//           className="w-7 h-7"
//         />
//       </Link>

//       {/* Links */}
//       <div className="flex items-center gap-3 md:gap-6">
//         <Link
//           to="/signUp"
//           className="px-4 py-2 text-black rounded-3xl text-lg hover:bg-gray-200 transition"
//         >
//           Open Account
//         </Link>
//         <Link
//           to="/login"
//           className="px-4 py-2 border border-blue-700 text-blue-700 rounded-3xl text-lg hover:bg-blue-50 transition"
//         >
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar1;

import React from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <nav className="w-full bg-gray-100 md:px-[100px] px-5 flex justify-between py-4 items-center shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <h3 className="text-blue-500 font-bold text-3xl">BankMate</h3>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3077/3077193.png"
          alt="Bank Logo"
          className="w-7 h-7"
        />
      </Link>

      {/* Links */}
      <div className="flex items-center gap-3 md:gap-6">
        <Link
          to="/signUp"
          className="px-4 py-2 text-black rounded-3xl text-lg hover:bg-gray-200 transition"
        >
          Open Account
        </Link>

        {/* Apply Loan Option */}
        <Link
          to="/loan"
          className="px-4 py-2 text-black rounded-3xl text-lg hover:bg-gray-200 transition"
        >
          Apply Loan
        </Link>

        <Link
          to="/login"
          className="px-4 py-2 border border-blue-700 text-blue-700 rounded-3xl text-lg hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar1;
