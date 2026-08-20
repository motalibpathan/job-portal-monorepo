import React, { useEffect, useRef, useState } from "react";
import { IGoogleLoginPayload } from "../../types/auth";
import {
  decodeGoogleCredential,
  loadGoogleIdentityScript,
} from "../../utils/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

interface IGoogleLoginButtonProps {
  onCredential: (payload: IGoogleLoginPayload) => void;
}

/**
 * "Continue with Google" button powered by Google Identity Services.
 * Loads the GIS script on demand and renders the official button into a
 * container div. No-op (hidden) when VITE_GOOGLE_CLIENT_ID is not set.
 */
const GoogleLoginButton: React.FC<IGoogleLoginButtonProps> = ({
  onCredential,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const onCredentialRef = useRef(onCredential);
  onCredentialRef.current = onCredential;

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    loadGoogleIdentityScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;

        window.google?.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            const decoded = decodeGoogleCredential(response.credential);
            if (!decoded?.email) return;
            window.google?.accounts.id.disableAutoSelect();
            onCredentialRef.current({
              token: response.credential,
              email: decoded.email,
              name: decoded.name,
              profilePicture: decoded.picture,
            });
          },
        });

        window.google?.accounts.id.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: "100%",
        });
      })
      .catch(() => {
        /* Google SDK failed to load - button stays hidden */
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!GOOGLE_CLIENT_ID || isLoading) return null;

  return (
    <div className="w-full">
      <div ref={containerRef} className="[&>div]:!w-full" />
    </div>
  );
};

export default GoogleLoginButton;
