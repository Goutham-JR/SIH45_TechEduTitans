import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";

const ConnectedAccounts = () => {
	const [connectedItems, setConnectedItems] = useState([
		{
			id: 1,
			type: "Email",
			value: "user@example.com",
			connected: true,
		},
		{
			id: 2,
			type: "Phone",
			value: "+1234567890",
			connected: false,
		},
	]);

	return (
		<SettingSection icon={HelpCircle} title={"Connected Accounts"}>
			{connectedItems.map((item) => (
				<div key={item.id} className='flex items-center justify-between py-3'>
					<div className='flex flex-col'>
						<span className='text-gray-300'>{item.type}</span>
						<span className='text-gray-400 text-sm'>{item.value}</span>
					</div>
					<button
						className={`px-3 py-1 rounded ${
							item.connected ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
						} transition duration-200`}
						onClick={() => {
							setConnectedItems(
								connectedItems.map((acc) => {
									if (acc.id === item.id) {
										return {
											...acc,
											connected: !acc.connected,
										};
									}
									return acc;
								})
							);
						}}
					>
						{item.connected ? "Connected" : "Connect"}
					</button>
				</div>
			))}
			
		</SettingSection>
	);
};

export default ConnectedAccounts;
