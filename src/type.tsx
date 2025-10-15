export type Launch = {
	mission_name: string;
	details?: string;
	links?: LaunchLinks;
	rocket?: Rocket;
};

type LaunchLinks = {
	mission_patch?: string;
	mission_patch_small?: string;
};

type Rocket = {
	rocket_name: string;
};

