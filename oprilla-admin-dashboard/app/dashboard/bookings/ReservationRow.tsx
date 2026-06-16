type Props = {
  customer: string;
  guests: number;
  table: string;
  status: string;
  source: string;
  time: string;
};

export default function ReservationRow({
  customer,
  guests,
  table,
  status,
  source,
  time,
}: Props) {
  return (
    <tr className="border-b">
      <td className="p-4">{customer}</td>
      <td className="p-4">{time}</td>
      <td className="p-4">{guests}</td>
      <td className="p-4">{table}</td>
      <td className="p-4">{status}</td>
      <td className="p-4">{source}</td>
    </tr>
  );
}