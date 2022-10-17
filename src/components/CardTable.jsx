import React from "react";

function CardTable({ title, conjugation }) {
  return (
      <div className=" CardTable p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
        <h2 className="text-3xl text-black font-bold text-left">{title}</h2>
        <table class="table-auto w-full my-7">
          <thead>
            <tr>
              <th className="p-4 text-black border-2 border-black">
                {conjugation[0]}
              </th>
            </tr>
            <tr>
              <th className="p-4 text-black border-2 border-black">
                {conjugation[1]}
              </th>
            </tr>
            <tr>
              <th className="p-4 text-black border-2 border-black">
                {conjugation[2]}
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
  );
}

export default CardTable;
