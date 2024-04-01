import { useState } from "react";
import CommitForm from "./CommitForm";
import GithubFetch from "./GithubFetch";
import { useOutletContext } from "react-router-dom";

const Commit = () => {
	const { project } = useOutletContext();

	const [commits, setCommits] = useState([]);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({})

	return (
		<div className='flex flex-col gap-5'>
			{commits?.length === 0 && (
				<CommitForm
					project={project}
					error={error}
					formData={formData}
					setError={setError}
					setFormData={setFormData}
				/>
			)}

			<GithubFetch
				owner={project.repoOwner}
				repo={project.repoName}
				setCommits={setCommits}
				commits={commits}
				error={error}
				setError={setError}
			/>
		</div>
	);
};

export default Commit;
