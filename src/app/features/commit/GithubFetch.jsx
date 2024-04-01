import axios from "axios";
import { useEffect, useContext } from "react";
import { UserPreferencesContext } from "../../context";

const GithubFetch = ({ owner, repo, commits, setCommits, setError }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api.github.com/repos/${owner}/${repo}/commits`
				);
				setCommits(response.data);
				setError("");
				// Clear any previous errors
			} catch (error) {
				setError(error);
				console.error("Error fetching GitHub data:", error);
				setCommits([]);
				return;
			} finally {
				setError(null);
			}
		};

		fetchData();
	}, [owner, repo]);

	const commitsByDate = {};
	commits?.forEach((commit) => {
		const commitDate = new Date(
			commit.commit.committer.date
		).toLocaleDateString();
		const commitTime = new Date(
			commit.commit.committer.date
		).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
		if (!commitsByDate[commitDate]) {
			commitsByDate[commitDate] = [];
		}
		commitsByDate[commitDate].push({
			message: commit.commit.message,
			time: commitTime,
			url: commit.author
				? commit.author.avatar_url
				: "https://placekitten.com/32/32",
			alt: commit.committer.login,
			name: commit.commit.author.name,
		});
	});

	return (
		<div className='w-full'>
			{commits?.length !== 0 && (
				<>
					<div className='mb-8'>
						<h1 className='text-2xl mb-1'>Project Commits</h1>
						<p
							style={{ color: userPreferences.shade.text.secondaryText }}
							className='text-sm whitespace-normal'
						>
							Below is a breakdown of all commits for {repo}
						</p>
					</div>

					<ul className='flex flex-col gap-10'>
						{Object.entries(commitsByDate).map(([date, commitMessages]) => (
							<li key={date}>
								<div className={`flex justify-center items-center gap-6  `}>
									{/* <span
										style={{ borderColor: userPreferences.shade.other }}
										className='border-b w-full'
									></span> */}
									<p className='text-sm'>
										Snapshot for{" "}
										<strong className='text-red-400 text-sm'>{date}</strong>
									</p>{" "}
									<span
										style={{ borderColor: userPreferences.shade.other }}
										className='border-b w-full'
									></span>
								</div>

								<ul className='px-8 flex flex-col gap-8 py-4 w-full'>
									{commitMessages.map(
										({ message, time, url, alt, name }, index) => (
											<li
												key={index}
												className='flex sm:flex-row flex-col  items-start gap-2 w-full'
											>
												<div>
													<img
														src={url}
														alt={alt}
														border
														className='w-11 h-11 rounded-full mr-1'
													/>
												</div>
												<div className='flex flex-col gap-1 w-full'>
													<span className='text-xs text-green-600'>{time}</span>

													<div className='flex items-center gap-[6px]'>
														<strong className='text-sm '>{name}</strong>{" "}
														<span
															style={{
																color: userPreferences.shade.text.secondaryText,
															}}
															className='text-sm whitespace-normal'
														>
															committed a message:
														</span>
													</div>
													<p
														style={{
															backgroundColor: userPreferences.shade.card,
														}}
														className='text-sm text-yellow-600 max-w-[400px] whitespace-normal min-h-[40px] py-1 px-2 rounded-lg'
													>
														{message}
													</p>
												</div>
											</li>
										)
									)}
								</ul>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default GithubFetch;
