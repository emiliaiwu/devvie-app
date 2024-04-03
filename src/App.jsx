import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import { LandingPage } from "./landing/pages";
import {
	SignUpPage,
	SignInPage,
	ForgotPasswordPage,
	ResetPasswordPage,
} from "./pages";
import { AppLayout } from "./app/layout";
import {
	TaskBoard,
	Details,
	Commit,
	GeneralCollection,
	CollectionPage,
	Portfolio,
} from "./app/pages";
import "./style/devvieLoader.css";
import "./style/app.css";
import { UserProfileContext } from "./app/context";
import React, { Suspense, useContext } from "react";
import { DevvieLoader } from "./components";

// Lazy load components
const LazyDashboard = React.lazy(() =>
	import("./app/features/dashboard/Dashboard")
);
const LazyTheme = React.lazy(() => import("./app/features/theme/Theme"));
const LazyTaskPage = React.lazy(() => import("./app/features/task/TaskPage"));
const LazyLibrary = React.lazy(() => import("./app/features/library/Library"));
const LazyProfile = React.lazy(() => import("./app/features/Profile/Profile"));
const LazyProjectLayout = React.lazy(() =>
	import("./app/layout/ProjectLayout")
);
const LazyProjectPage = React.lazy(() =>
	import("./app/features/project/ProjectPage")
);
const LazyTask = React.lazy(() => import("./app/features/task/Task"));
const LazyNotFound = React.lazy(() => import("./landing/pages/NotFound"));

const App = () => {
	const { userProfile } = useContext(UserProfileContext);
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				{userProfile?.isPublished && (
					<Route path={`${userProfile.username}`} element={<Portfolio />} />
				)}

				<Route index element={<LandingPage />} />
				<Route path='/signin' element={<SignInPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='/reset-password' element={<ResetPasswordPage />} />

				<Route path='user' element={<AppLayout />}>
					<Route index element={<LazyDashboard />} />
					<Route path='dashboard' element={<LazyDashboard />} />
					<Route path='appearance' element={<LazyTheme />} />
					<Route path='tasks' element={<LazyTaskPage />} />
					<Route path='devmark' element={<LazyLibrary />}>
						<Route index element={<GeneralCollection />} />
						<Route path=':slug' element={<CollectionPage />} />
					</Route>
					<Route path='profile' element={<LazyProfile />} />
					<Route path='projects' element={<LazyProjectLayout />}>
						<Route index element={<LazyProjectPage />} />
						<Route path=':slug' element={<LazyTask />}>
							<Route index element={<TaskBoard />} />
							<Route path='details' element={<Details />} />
							<Route path='commits' element={<Commit />} />
						</Route>
						<Route path='*' element={<LazyNotFound />} />
					</Route>
					<Route path='*' element={<LazyNotFound />} />
				</Route>
				<Route path='*' element={<LazyNotFound />} />
			</Route>
		)
	);

	return (
		<Suspense fallback={<DevvieLoader />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};

export default App;
