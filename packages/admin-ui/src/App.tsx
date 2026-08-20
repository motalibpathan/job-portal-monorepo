import { App as AntdApp, ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@job-portal/common/src/HOC/contexts/General/AuthContext/AuthProvider";
import { router } from "./HOC/routes/Router";

const App: React.FC = () => {
  return (
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2980b9",
            borderRadius: 8,
            fontFamily: "Space Grotesk, Segoe UI, sans-serif",
          },
        }}
      >
        <AntdApp>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default App;
