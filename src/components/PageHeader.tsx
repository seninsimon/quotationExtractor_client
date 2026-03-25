import { ActionIcon,  } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate  } from "react-router-dom";


export default function PageHeader({
  title,
}: {
  title: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ActionIcon
          variant="light"
          onClick={() => navigate(-1)}
        >
          <IconArrowLeft size={18} />
        </ActionIcon>

        <h2 className="text-lg font-semibold text-[#1F2937]">
          {title}
        </h2>
      </div>

    </div>
  );
}