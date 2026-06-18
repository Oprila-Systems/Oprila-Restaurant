type Props = {
  item: {
    customer: string;
    guests: number;
    table: string;
    status: string;
    source: string;
    time: string;
  };
};

export default function ReservationRow({ item }: Props) {
  return (
    <tr className="border-b">
      <td className="p-4">{item.customer}</td>
      <td className="p-4">{item.time}</td>
      <td className="p-4">{item.guests}</td>
      <td className="p-4">{item.table}</td>
      <td className="p-4">{item.status}</td>
      <td className="p-4">{item.source}</td>
    </tr>
  );
}