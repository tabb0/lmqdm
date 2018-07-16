import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-table-list',
	templateUrl: './table-list.component.html',
	styleUrls: ['./table-list.component.css'],
	providers: [NgbCarouselConfig]
})
export class TableListComponent implements OnInit {

	constructor(private http: HttpClient, public dialog: MatDialog, config: NgbCarouselConfig) { 
		// customize default values of carousels used by this component tree
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
	}

	private baseServerUrl = "https://lifemiles.cortteza.com/lmqdm/";

	private participants: any = [];

	private selectedParticipant: any = "";

	private matches = [
		{ "IDPartido": 1, "Grupo": "A", "t1": "Russia", "t2": "Arabia Saudi" },
		{ "IDPartido": 2, "Grupo": "A", "t1": "Egipto", "t2": "Uruguay" },
		{ "IDPartido": 3, "Grupo": "A", "t1": "Russia", "t2": "Egipto" },
		{ "IDPartido": 4, "Grupo": "A", "t1": "Uruguay", "t2": "Arabia Saudi" },
		{ "IDPartido": 5, "Grupo": "A", "t1": "Arabia Saudi", "t2": "Egipto" },
		{ "IDPartido": 6, "Grupo": "A", "t1": "Uruguay", "t2": "Russia" },

		{ "IDPartido": 1, "Grupo": "B", "t1": "Marruecos", "t2": "Irán" },
		{ "IDPartido": 2, "Grupo": "B", "t1": "Portugal", "t2": "España" },
		{ "IDPartido": 3, "Grupo": "B", "t1": "Irán", "t2": "España" },
		{ "IDPartido": 4, "Grupo": "B", "t1": "Portugal", "t2": "Marruecos" },
		{ "IDPartido": 5, "Grupo": "B", "t1": "Irán", "t2": "Portugal" },
		{ "IDPartido": 6, "Grupo": "B", "t1": "España", "t2": "Marruecos" },

		{ "IDPartido": 1, "Grupo": "C", "t1": "Francia", "t2": "Australia" },
		{ "IDPartido": 2, "Grupo": "C", "t1": "Peru", "t2": "Dinamarca" },
		{ "IDPartido": 3, "Grupo": "C", "t1": "Dinamarca", "t2": "Australia" },
		{ "IDPartido": 4, "Grupo": "C", "t1": "Francia", "t2": "Perú" },
		{ "IDPartido": 5, "Grupo": "C", "t1": "Australia", "t2": "Perú" },
		{ "IDPartido": 6, "Grupo": "C", "t1": "Dinamarca", "t2": "Francia" },

		{ "IDPartido": 1, "Grupo": "D", "t1": "Argentina", "t2": "Islandia" },
		{ "IDPartido": 2, "Grupo": "D", "t1": "Croacia", "t2": "Nigeria" },
		{ "IDPartido": 3, "Grupo": "D", "t1": "Argentina", "t2": "Croacia" },
		{ "IDPartido": 4, "Grupo": "D", "t1": "Nigeria", "t2": "Islandia" },
		{ "IDPartido": 5, "Grupo": "D", "t1": "Islandia", "t2": "Croacia" },
		{ "IDPartido": 6, "Grupo": "D", "t1": "Nigeria", "t2": "Argentina" },

		{ "IDPartido": 1, "Grupo": "E", "t1": "Brasil", "t2": "Suiza" },
		{ "IDPartido": 2, "Grupo": "E", "t1": "Costa Rica", "t2": "Serbia" },
		{ "IDPartido": 3, "Grupo": "E", "t1": "Brasil", "t2": "Costa Rica" },
		{ "IDPartido": 4, "Grupo": "E", "t1": "Serbia", "t2": "Suiza" },
		{ "IDPartido": 5, "Grupo": "E", "t1": "Serbia", "t2": "Brasil" },
		{ "IDPartido": 6, "Grupo": "E", "t1": "Suiza", "t2": "Costa Rica" },

		{ "IDPartido": 1, "Grupo": "F", "t1": "Alemania", "t2": "Mexico" },
		{ "IDPartido": 2, "Grupo": "F", "t1": "Suecia", "t2": "Korea" },
		{ "IDPartido": 3, "Grupo": "F", "t1": "Alemania", "t2": "Suecia" },
		{ "IDPartido": 4, "Grupo": "F", "t1": "Korea", "t2": "Mexico" },
		{ "IDPartido": 5, "Grupo": "F", "t1": "Korea", "t2": "Alemania" },
		{ "IDPartido": 6, "Grupo": "F", "t1": "Mexico", "t2": "Suecia" },

		{ "IDPartido": 1, "Grupo": "G", "t1": "Belgica", "t2": "Panama" },
		{ "IDPartido": 2, "Grupo": "G", "t1": "Tunez", "t2": "Inglaterra" },
		{ "IDPartido": 3, "Grupo": "G", "t1": "Belgica", "t2": "Tunez" },
		{ "IDPartido": 4, "Grupo": "G", "t1": "Inglaterra", "t2": "Panama" },
		{ "IDPartido": 5, "Grupo": "G", "t1": "Inglaterra", "t2": "Belgica" },
		{ "IDPartido": 6, "Grupo": "G", "t1": "Panama", "t2": "Tunez" },

		{ "IDPartido": 1, "Grupo": "H", "t1": "Colombia", "t2": "Japon" },
		{ "IDPartido": 2, "Grupo": "H", "t1": "Polonia", "t2": "Senegal" },
		{ "IDPartido": 3, "Grupo": "H", "t1": "Japon", "t2": "Senegal" },
		{ "IDPartido": 4, "Grupo": "H", "t1": "Polonia", "t2": "Colombia" },
		{ "IDPartido": 5, "Grupo": "H", "t1": "Japon", "t2": "Polonia" },
		{ "IDPartido": 6, "Grupo": "H", "t1": "Senegal", "t2": "Colombia" },
		
		{ "IDPartido": 1, "Grupo": "8vos", "t1": "Uruguay", "t2": "Portugal" },
		{ "IDPartido": 2, "Grupo": "8vos", "t1": "Francia", "t2": "Argentina" },
		{ "IDPartido": 3, "Grupo": "8vos", "t1": "Brasil", "t2": "Mexico" },
		{ "IDPartido": 4, "Grupo": "8vos", "t1": "Belgica", "t2": "Japon" },
		{ "IDPartido": 5, "Grupo": "8vos", "t1": "España", "t2": "Rusia" },
		{ "IDPartido": 6, "Grupo": "8vos", "t1": "Croacia", "t2": "Dinamarca" },
		{ "IDPartido": 7, "Grupo": "8vos", "t1": "Suecia", "t2": "Suiza" },
		{ "IDPartido": 8, "Grupo": "8vos", "t1": "Colombia", "t2": "Inglaterra" },

		{ "IDPartido": 1, "Grupo": "4tos", "t1": "Uruguay", "t2": "Francia" },
		{ "IDPartido": 2, "Grupo": "4tos", "t1": "Brasil", "t2": "Belgica" },
		{ "IDPartido": 3, "Grupo": "4tos", "t1": "Suecia", "t2": "Inglaterra" },
		{ "IDPartido": 4, "Grupo": "4tos", "t1": "Russia", "t2": "Croacia" },

		{ "IDPartido": 1, "Grupo": "Semis", "t1": "Francia", "t2": "Belgica" },
		{ "IDPartido": 2, "Grupo": "Semis", "t1": "Croacia", "t2": "Inglaterra" },

		{ "IDPartido": 1, "Grupo": "3er", "t1": "Belgica", "t2": "Inglaterra" },

		{ "IDPartido": 1, "Grupo": "Final", "t1": "Francia", "t2": "Croacia" },
	]

	private groupedMatches = [];

	private selectedMatchToCompare = {};
	private isGroupSelected: boolean = false;

	sortByKey(array, key, direction) {
		if (direction == undefined) direction = 1; // Ascending
		return array.sort(function (a, b) {
			if (direction == 1) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			}
			else {
				var x = a[key]; var y = b[key];
				return ((x > y) ? -1 : ((x < y) ? 1 : 0));
			}
		});
	}

	GetRanking() {
		const endpoint = this.baseServerUrl + 'participantes';

		this.http.get(endpoint).subscribe(response => {

			console.log(response);
			this.participants = response["data"];

			this.participants = this.sortByKey(this.participants, "Puntos", -1);

			this.groupMatches();

			this.selectedParticipant = this.participants[0];
			this.onChange(this.selectedParticipant.Nombre);
		},
			err => {
				console.log("Error", err)
			}
		);
	}

	GetClass(IDPartido, Grupo) {
		if (this.selectedMatchToCompare) {
			if (this.selectedMatchToCompare["IDPartido"] == IDPartido && this.selectedMatchToCompare["Grupo"] == Grupo) {
				return "match-selected";
			}
		}

		return "";
	}

	groupMatches() {
		let groups = ['Final', '3er','Semis', '4tos','8vos','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
		let matches = [1, 2, 3, 4, 5, 6];

		let groupedInfo = [];
		let scope = this;
		groups.forEach(function (g) {

			let newGroup = {Grupo:g, Matches:[]};
			
			if (g == "8vos") {
				matches = [1, 2, 3, 4, 5, 6, 7, 8];
			}
			else {
				if (g == "4tos") {
					matches = [1, 2, 3, 4];
				}
				else {
					if (g == "Semis") {
						matches = [1, 2];
					}
					else {
						if (g == "3er") {
							matches = [1];
						}
						else {
							if (g == "Final") {
								matches = [1];
							}
							else matches = [1, 2, 3, 4, 5, 6];
						}
					}
				}
			}
			

			matches.forEach(m => {
				let newMatch = { Grupo: g, IDPartido: m, Pronosticos: [] };

				let _match = scope.matches.filter(_m => _m.IDPartido == m && _m.Grupo == g)[0];
				newMatch["Team1"] = _match["t1"];
				newMatch["Team2"] = _match["t2"];

				scope.participants.forEach(participant => {
					var prons = participant.Pronosticos.filter(pron => pron.Grupo == g && pron.IDPartido == m);
					if (prons.length > 0) {
						newMatch.Pronosticos.push({ Nombre: participant.Nombre, Pronostico: prons[0] });
					}
				});

				newGroup["Matches"].push(newMatch);
			});

			groupedInfo.push(newGroup);
		});

		this.groupedMatches = groupedInfo;
		console.log(groupedInfo);
	}

	groupInfoByGroupAndId(participant) {
		let groups = ['Final', '3er','Semis', '4tos', '8vos', 'A','B','C','D','E','F','G','H'];

		let groupedInfo = [];
		let scope = this;
		groups.forEach(function(g) {
			let prons = scope.selectedParticipant.Pronosticos.filter(p => p.Grupo == g);
			let log = scope.selectedParticipant["log"];
			prons = scope.sortByKey(prons, "IDPartido", 1);

			let groupMatches = scope.matches.filter(m => m.Grupo == g);

			prons.forEach(p => {
				let _match = groupMatches.filter(gm => gm.IDPartido == p.IDPartido);
				let match = _match[0];
				p["t1"] = match["t1"];
				p["t2"] = match["t2"];
				p["Puntos"] = "";
				p["Comodin"] = "";
				p["Available"] = false;

				// Gets the point from the log
				let found = log.filter(l => l["data"]["Grupo"] == g && l["data"]["IDPartido"] == p.IDPartido);
				if (found.length > 0) {
					p["Available"] = true;
					found.forEach(f => {
						if (p["puntos"] == "") p["puntos"] = 0;
						
						p["Puntos"] = Number(p["Puntos"]) + Number(f["Puntos"]);

						if (f["origen"].indexOf('Comodin') >= 0) {
							p["Comodin"] = f["data"]["jugador"];
						}
					});
				}
				else {
					p["Puntos"] = ""; // Match not available
					p["Comodin"] = "";
				}
			});

			groupedInfo.push({Grupo:g, Pronosticos: prons});
		});
		
		console.log(groupedInfo);
		return groupedInfo;
	}

	onChange(value) {
		this.selectedParticipant = this.participants.filter(p => p.Nombre == value)[0];
		this.selectedParticipant["GroupedInfo"] = this.groupInfoByGroupAndId(this.selectedParticipant);
	}

	DoClick(participant) {
		var elmnt = document.getElementById("stats");
		elmnt.scrollIntoView();
		this.onChange(participant.Nombre);
	}

	ShowResults(match) {
		this.isGroupSelected = true;
		this.selectedMatchToCompare = match;
		console.log(this.selectedMatchToCompare);
	}

	ngOnInit() {
		this.GetRanking();
	}

}
