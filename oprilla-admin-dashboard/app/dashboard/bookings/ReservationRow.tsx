import { MoreVertical } from "lucide-react";
type Props = {
  item: {
    customer: string;
    guests: number;
    table: string;
    status: string;
    source: string;
    time: string;
    approve?: boolean;
  };
};

export default function ReservationRow({ item }: Props) {
  return (
    <tr className="border-b border-[#F0F0F0]">
      <td className="p-4">{item.customer}</td>
      <td className="p-4">{item.time}</td>
      <td className="p-4">{item.guests}</td>
      <td className="p-4">{item.table}</td>
      <td className="p-4">{item.status}</td>
      <td className="p-4">{item.source}</td>

      
      <td className="p-4">
       <div className="flex items-center justify-end gap-2">
        {item.approve && (
      <button className="text-[12px] font-semibold text-[#2B2B2B] hover:underline">
        Approve
      </button>
      )}

     <MoreVertical
      size={16}
      className="cursor-pointer text-[#9B9792] hover:text-[#2B2B2B]"
    />
  </div>
</td>
    </tr>
  );
}