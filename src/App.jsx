import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import { LandingPage, NotFound } from "./landing/pages";
import {
	SignUpPage,
	SignInPage,
	ForgotPasswordPage,
	ResetPasswordPage,
} from "./pages";
import { AppLayout, ProjectLayout } from "./app/layout";
import {
	Dashboard,
	Theme,
	Task,
	TaskBoard,
	Details,
	Commit,
	TaskPage,
	ProjectPage,
	Library,
	GeneralCollection,
	CollectionPage,
	Profile,
	Portfolio,
} from "./app/pages";
import "./style/devvieLoader.css";
import "./style/app.css";
import { UserProfileContext } from "./app/context";
import { useContext } from "react";
// Lazy
// const LazyDashboard = React.lazy

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
					<Route index element={<Dashboard />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='appearance' element={<Theme />} />
					<Route path='tasks' element={<TaskPage />} />
					<Route path='devmark' element={<Library />}>
						<Route index element={<GeneralCollection />} />
						<Route path=':slug' element={<CollectionPage />} />
					</Route>
					<Route path='profile' element={<Profile />} />
					<Route path='projects' element={<ProjectLayout />}>
						<Route index element={<ProjectPage />} />
						<Route path=':slug' element={<Task />}>
							<Route index element={<TaskBoard />} />
							<Route path='details' element={<Details />} />
							<Route path='commits' element={<Commit />} />
						</Route>
						<Route path='*' element={<NotFound />} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
