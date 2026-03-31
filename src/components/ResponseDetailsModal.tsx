import { Modal, Badge, Divider } from "@mantine/core";

type Response = {
  _id: string;
  supplierName: string;
  email?: string;
  contact?: string;
  amount?: number;
  textQuote?: string;
  file?: string;
  notes?: string;
  status: string;
  createdAt: string;
};

type Props = {
  opened: boolean;
  onClose: () => void;
  data?: Response | null;
};

export default function ResponseDetailsModal({ opened, onClose, data }: Props) {
  if (!data) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Quotation Details"
      centered
      size="100%"
      radius="md"
      styles={{
        content: {
          maxWidth: "95vw",
        },
        body: {
          padding: "20px",
        },
      }}
    >
      <div className="space-y-4 text-sm">

        <div>
          <h3 className="font-semibold text-base">Supplier</h3>
          <p>{data.supplierName}</p>
        </div>


        <div>
          <h3 className="font-semibold text-base">Contact</h3>
          <div className="text-gray-600">
            {data.email && <div>Email: {data.email}</div>}
            {data.contact && <div>Phone: {data.contact}</div>}
          </div>
        </div>

        <Divider />

    
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-base">Amount</h3>
            <p className="text-lg font-semibold">
              {data.amount ? `₹ ${data.amount}` : "N/A"}
            </p>
          </div>

          <Badge color={data.status === "selected" ? "green" : "gray"}>
            {data.status}
          </Badge>
        </div>

        <Divider />

     
        <div>
          <h3 className="font-semibold text-base mb-2">Quotation</h3>
          <div className="bg-gray-100 p-3 rounded-md whitespace-pre-wrap">
            {data.textQuote || "No quote provided"}
          </div>
        </div>


        {data.notes && (
          <div>
            <h3 className="font-semibold text-base mb-2">Notes</h3>
            <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
              {data.notes}
            </div>
          </div>
        )}


        <div>
          <h3 className="font-semibold text-base mb-2">Attachment</h3>
          {data.file ? (
            <a
              href={`${import.meta.env.VITE_API_URL}/uploads/${data.file}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Attachment
            </a>
          ) : (
            <p className="text-gray-500">No attachment</p>
          )}
        </div>


        <div className="text-gray-500 text-xs">
          Submitted on: {new Date(data.createdAt).toLocaleString()}
        </div>
      </div>
    </Modal>
  );
}
