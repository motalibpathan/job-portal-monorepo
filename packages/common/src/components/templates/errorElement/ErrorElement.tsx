import React from "react";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../../HOC/routes/routes";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";

const ErrorElement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background-body-2-light-1 p-10">
      <Heading $level={1} className="!mb-0">
        Oops!
      </Heading>
      <Paragraph $level={2} $typographyPalette="subtitle" className="!mb-6">
        We ran into a problem
      </Paragraph>
      <Button type="filled" color="primary" onClick={() => navigate(HOME)}>
        Go to home
      </Button>
    </div>
  );
};

export default ErrorElement;
