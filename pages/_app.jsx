import { Router } from "next/router";
import nprogress from "nprogress";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import connectSocket, { EventListeners } from "sockets";
import { useRfidStore } from "store/rfid.store";
import "styles/globals.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

nprogress.configure({
	minimum: 0.3,
	easing: "ease",
	speed: 800,
	showSpinner: true,
});

Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.done());
Router.events.on("routeChangeError", () => nprogress.done());

const App = (props) => {
	const dispatchToRfid = useRfidStore((state) => state.dispatchToRfid);

	useEffect(() => {
		dispatchToRfid({ type: "SET_SOCKET", payload: connectSocket() });
	}, []);
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AppWithQuery {...props} />
				{process.env.NODE_ENV === "development" && (
					<ReactQueryDevtools initialIsOpen={true} />
				)}
			</QueryClientProvider>
		</>
	);
};

const AppWithQuery = ({ Component, pageProps }) => {
	const rfidSocket = useRfidStore(state => state.rfidSocket)
	return <>
		<Component {...pageProps} />
		{rfidSocket && <EventListeners />}
	</>;
};

export default App;
