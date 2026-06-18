interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function Table({
  headers,
  children,
}: TableProps) {
  return (
    <table className="w-full min-w-[720px]">

      <thead className="bg-[#F8F7F3]">
        <tr className="text-[11px] uppercase tracking-wide text-[#7E7A74]">

          {headers.map((header) => (
            <th
              key={header}
              className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap"
            >
              {header}
            </th>
          ))}

        </tr>
      </thead>

      <tbody>{children}</tbody>

    </table>
  );
}