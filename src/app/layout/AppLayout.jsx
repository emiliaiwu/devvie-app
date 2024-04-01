import { Navigate, Outlet } from "react-router-dom";
import {
	DeleteAccount,
	Header,
	LoadingOut,
	Logout,
	MobileMenu,
	SidebarLeft,
} from "../components";
import { useScrollToTop } from "../../hooks";
import { useContext } from "react";
import { ToastContext, UserPreferencesContext } from "../context";
import Toast from "../features/toast/Toast";
import { DevvieLoader } from "../../components";
import { AuthContext, UserContext } from "../../context";

const AppLayout = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { toasting } = useContext(ToastContext);
	const {
		wantToLogout,
		setWantToLogout,
		wantToDeleteAccount,
		setWantToDeleteAccount,
	} = useContext(UserContext);
	useScrollToTop();

	const { user, loading, renderGoodbye } = useContext(AuthContext);

	if (loading) {
		return <DevvieLoader />;
	}

	if (user && !window.location.pathname.startsWith("/user")) {
		return <Navigate to='/user/dashboard' />;
	}

	if (!user && renderGoodbye) {
		return <LoadingOut />;
	} else if (!user) {
		return <Navigate to='/signin' />;
	}

	// if (!user) {
	// 	return <Navigate to='/signin' />;
	// }

	return (
		<div
			style={{ backgroundColor: userPreferences.shade.background }}
			className=' mx-auto relative app-layout h-full'
		>
			{wantToLogout && (
				<Logout setWantToLogout={setWantToLogout} wantToLogout={wantToLogout} />
			)}

			{wantToDeleteAccount && (
				<DeleteAccount
					wantToDeleteAccount={wantToDeleteAccount}
					setWantToDeleteAccount={setWantToDeleteAccount}
				/>
			)}

			{renderGoodbye && <LoadingOut />}

			{toasting && (
				<div className='fixed inset-0 z-[1000]'>
					<Toast />
				</div>
			)}

			<div className='lg:hidden flex flex-col relative w-full h-full'>
				<Header />
				<MobileMenu />
				<main
					style={{ backgroundColor: userPreferences.shade.background }}
					className='transition-width duration-200 ease min-h-full '
				>
					<Outlet />
				</main>
			</div>

			<div className='hidden lg:flex flex-col relative h-full'>
				<Header />
				<SidebarLeft
					setWantToLogout={setWantToLogout}
					setWantToDeleteAccount={setWantToDeleteAccount}
				/>

				<main
					style={{ backgroundColor: userPreferences.shade.background }}
					className='transition-width duration-200 ease h-screen '
				>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
