import { styles } from "../style/reusableStyles";
import { ResetPasswordForm } from "../components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { checkActionCode } from "firebase/auth";
import { auth } from "../firebase";
import { DevvieLoader } from "../components";
import { useScrollToTop } from "../hooks";

const ResetPasswordPage = () => {
	const { container, flexCenter } = styles;
	useScrollToTop();
	const query = useQuery();
	function useQuery() {
		const location = useLocation();
		return new URLSearchParams(location.search);
	}

	const [isActionCodeValid, setIsActionCodeValid] = useState(null);
	const [IsLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const actionCode = query.get("oobCode");

		const checkActionCodeValidity = async () => {
			try {
				await checkActionCode(auth, actionCode);
				// The action code is valid
				setIsActionCodeValid(true);
			} catch (error) {
				// The action code is invalid (e.g., expired or already used)
				setIsActionCodeValid(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkActionCodeValidity();
	}, []);

	return (
		<>
			{IsLoading ? (
				<DevvieLoader />
			) : (
				<section
					className={`${container} ${flexCenter} bg-offwhite ss:py-20 px-3 min-h-screen py-10`}
				>
					<div className='max-w-[500px] w-full flex justify-center items-center rounded-2xl p-3 backdrop border border-white'>
						<div className='w-full bg-white rounded-2xl lg:flex overflow-hidden gap-4'>
							<ResetPasswordForm
								query={query}
								isActionCodeValid={isActionCodeValid}
							/>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default ResetPasswordPage;
