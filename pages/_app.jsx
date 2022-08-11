import { Navbar } from "components";
import Head from "next/head";
import { Router } from "next/router";
import nprogress from "nprogress";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "services/queryClient";
import connectSocket, { EventListeners } from "sockets";
import { useRfidStore } from "store/rfid.store";
import "styles/globals.css";

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
		setTimeout(
			() =>
				dispatchToRfid({
					type: "SET_SOCKET",
					payload: connectSocket(),
				}),
			1000
		);
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
	let rfidSocket = useRfidStore((state) => state.rfidSocket);

	return (
		<>
			<Head>
				<title>Elevator Costing</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<Navbar />
			</header>
			<main>
				<Component {...pageProps} />
				{rfidSocket && <EventListeners />}
			</main>
			<footer></footer>
		</>
	);
};

export default App;
