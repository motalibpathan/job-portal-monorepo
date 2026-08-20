import React from "react";
import { Button } from "antd";
import {
  PlusOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Paragraph } from "../../atoms/typography/paragraph";
import { TextFieldForm } from "../../molecules/inputs/textField";
import { TrashIcon } from "../../atoms/icons";
import type { IHiringStage } from "../../../api/userApi/types";

const DEFAULT_STAGES: IHiringStage[] = [
  { stageId: "applied", name: "Applied", order: 1 },
  { stageId: "screening", name: "Screening", order: 2 },
  { stageId: "interview", name: "Interview", order: 3 },
  { stageId: "evaluation", name: "Evaluation", order: 4 },
  { stageId: "offer", name: "Offer", order: 5 },
  { stageId: "hired", name: "Hired", order: 6 },
  { stageId: "archive", name: "Archive", order: 7 },
];

const STAGE_COLORS: Record<string, string> = {
  applied: "blue",
  screening: "cyan",
  interview: "purple",
  evaluation: "orange",
  offer: "gold",
  hired: "green",
  archive: "default",
};

interface IHiringStageBuilderProps {
  stages: IHiringStage[];
  onChange: (stages: IHiringStage[]) => void;
}

const HiringStageBuilder: React.FC<IHiringStageBuilderProps> = ({
  stages,
  onChange,
}) => {
  const addStage = () => {
    const newStage: IHiringStage = {
      stageId: `custom_${Date.now()}`,
      name: "",
      order: stages.length,
    };
    onChange([...stages, newStage]);
  };

  const removeStage = (index: number) => {
    const updated = stages
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, order: i + 1 }));
    onChange(updated);
  };

  const updateStageName = (index: number, name: string) => {
    const updated = stages.map((s, i) =>
      i === index ? { ...s, name } : s,
    );
    onChange(updated);
  };

  const moveStage = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= stages.length) return;
    const updated = [...stages];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const resetToDefaults = () => {
    onChange([...DEFAULT_STAGES]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Paragraph $level={3} $typographyPalette="subtitle" className="!mb-0">
          Define the stages applicants move through.
        </Paragraph>
        <Button type="text" icon={<UndoOutlined />} onClick={resetToDefaults}>
          Reset to Defaults
        </Button>
      </div>

      {stages.length === 0 && (
        <div className="border-borders-light-1 bg-background-body-2-light-1 rounded-xl border border-dashed p-8 text-center">
          <Paragraph $level={3} $typographyPalette="subtitle">
            No stages. Click "Reset to Defaults" or add custom stages.
          </Paragraph>
        </div>
      )}

      {stages.map((stage, index) => {
        const color = STAGE_COLORS[stage.stageId] ?? "default";
        return (
          <div
            key={stage.stageId}
            className="border-borders-light-1 bg-background-body-2-light-1 flex items-center gap-3 rounded-xl border p-4"
          >
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                className="text-primary-main text-xs disabled:opacity-30"
                disabled={index === 0}
                onClick={() => moveStage(index, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                className="text-primary-main text-xs disabled:opacity-30"
                disabled={index === stages.length - 1}
                onClick={() => moveStage(index, 1)}
              >
                ↓
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-typography-subtitle-light-1 text-sm font-medium">
                {index + 1}.
              </span>
              <TextFieldForm
                labelText=""
                name={`stage_name_${index}`}
                placeholder="Stage name"
                value={stage.name}
                onChange={(e) => updateStageName(index, e.target.value)}
                inputClassName="!w-64"
              />
              {!stage.stageId.startsWith("custom_") && (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-${color}-main/10 text-${color}-main`}
                >
                  {stage.name}
                </span>
              )}
            </div>

            <Button
              type="text"
              color="danger"
              icon={<TrashIcon />}
              onClick={() => removeStage(index)}
              danger
              size={"large"}
            />
          </div>
        );
      })}

      <Button type="dashed" icon={<PlusOutlined />} onClick={addStage} block size={"large"}>
        Add Stage
      </Button>
    </div>
  );
};

export default HiringStageBuilder;
