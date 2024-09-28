export const Ores = {
		"A": {
			"value": 1,
			"hp": 1,
			"image": "copper.png"

		},
		"B": {
			"value": 2,
			"hp": 2,
			"image": "titanium.png"
		},
		"C": {
			"value": 3,
			"hp":3,
			"image": "red_square.png"
		},
		"D": {
			"value": 4,
			"hp":1,
			"image": "blue_square.png"
		}
}

export const Layers = [
	{	
		"cost": 0, 
		"ores": {"A": 1}, 
		"respawn_time": 2,
		"multipliers": {"A": 1}
	},
	{
		"cost": 100,
		"ores": {"A": 0.5, "B": 0.4, "C": 0.1},
		"respawn_time": 10,
		"multipliers": {"A": 5, "B": 1, "C": 1}
	},
	{
		"cost": 1000,
		"ores": {"C": 0.75, "D": 0.25},
		"respawn_time": 10,
		"multipliers": {"C": 2, "D": 1}
	},
	{
		"cost": 5000,
		"ores": {"D": 1},
		"respawn_time": 10,
		"multipliers": {"D": 1}
	}
]

export const Smelters = {
	"A": {
		"base_capacity": 1,
		"base_efficiency": 5,
		"base_time": 3000
	},
	"B": {
		"base_capacity": 1,
		"base_efficiency": 10,
		"base_time": 10000
	},
	"C": {
		"base_capacity": 1,
		"base_efficiency": 10,
		"base_time": 10000
	},
	"D": {
		"base_capacity": 1,
		"base_efficiency": 10,
		"base_time": 10000
	},

}

export const Smelter_Load_Time = 2000 //in milliseconds
export const Max_Ores = 8
