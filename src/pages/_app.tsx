import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { HistoryProvider } from "~/components/HistoryProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <HistoryProvider>
        <Component {...pageProps} />
      </HistoryProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
