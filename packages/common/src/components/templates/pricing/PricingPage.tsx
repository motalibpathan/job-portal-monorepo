import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import {
  COMPANY_PLAN_TEXT_MAP,
  PLAN_CONFIG,
  type TCompanyPlan,
} from "../../../api/userApi/types";
import { LOGIN, COMPANIES } from "../../../HOC/routes/routes";

interface PlanFeature {
  label: string;
  included: boolean;
}

const getPlanFeatures = (plan: TCompanyPlan): PlanFeature[] => {
  const config = PLAN_CONFIG[plan];
  return [
    {
      label: `${config.activeJobLimit} active job${config.activeJobLimit > 1 ? "s" : ""}`,
      included: true,
    },
    {
      label:
        config.teamMembers === Infinity
          ? "Unlimited team members"
          : `${config.teamMembers} team member`,
      included: true,
    },
    { label: "Unlimited candidates", included: true },
    { label: "Customizable careers page", included: true },
    { label: "Custom pipeline stages", included: plan !== "free" },
    { label: "Custom application forms", included: true },
    { label: "Embed jobs on website", included: plan !== "free" },
    { label: "Remove branding", included: plan !== "free" },
  ];
};

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  const plans: TCompanyPlan[] = ["free", "bootstrap", "startup", "business"];

  const handleGetStarted = (plan: TCompanyPlan) => {
    if (plan === "free") {
      if (isAuthenticated) {
        navigate(COMPANIES);
      } else {
        navigate(LOGIN);
      }
    } else {
      if (isAuthenticated) {
        navigate(COMPANIES);
      } else {
        navigate(LOGIN);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-body-2-light-1">
      {/* Header */}
      <div className="border-b border-borders-light-1 bg-white py-16 text-center">
        <Heading $level={2} className="!mb-2">
          Simple, Transparent Pricing
        </Heading>
        <Paragraph
          $level={3}
          $typographyPalette="subtitle"
          className="!mb-0 mx-auto max-w-xl"
        >
          Choose the plan that fits your hiring needs. No hidden fees. Upgrade
          or downgrade anytime.
        </Paragraph>
      </div>

      {/* Plans Grid */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((planKey) => {
            const config = PLAN_CONFIG[planKey];
            const features = getPlanFeatures(planKey);
            const isPopular = planKey === "startup";

            return (
              <div
                key={planKey}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-card-2 ${
                  isPopular
                    ? "border-primary-main ring-2 ring-primary-main"
                    : "border-borders-light-1"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-main px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <Heading $level={4} className="!mb-1">
                  {COMPANY_PLAN_TEXT_MAP[planKey]}
                </Heading>
                <div className="mb-4 flex items-baseline gap-1">
                  <Heading $level={3}>${config.price}</Heading>
                  {config.price > 0 && (
                    <Paragraph
                      $level={4}
                      $typographyPalette="subtitle"
                      className="!mb-0"
                    >
                      /month
                    </Paragraph>
                  )}
                </div>

                {config.price === 0 && (
                  <Paragraph
                    $level={4}
                    $typographyPalette="subtitle"
                    className="!mb-4"
                  >
                    Always free
                  </Paragraph>
                )}

                <ul className="mb-6 flex-1 space-y-2">
                  {features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckOutlined
                        className={`mt-0.5 ${
                          feature.included
                            ? "text-success-main"
                            : "text-typography-placeholder"
                        }`}
                      />
                      <span
                        className={
                          feature.included
                            ? ""
                            : "text-typography-placeholder line-through"
                        }
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  type={isPopular ? "filled" : "outlined"}
                  color="primary"
                  className="w-full"
                  onClick={() => handleGetStarted(planKey)}
                >
                  Get Started
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
