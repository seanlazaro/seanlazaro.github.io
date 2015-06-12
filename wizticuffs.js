var numUserCharges = 0;
var numOppCharges = 0;

$(document).ready(function(){
	$("#howToPlay").hide();
	var oppMove;

	$("#howToPlayBtn").click(function(){
		$("#howToPlay").show();
	});

	$("#charge").click(function(){
		$("#results").append("You stopped to charge energy.<br>");
		$("#results").scrollTop($("#results")[0].scrollHeight);
		oppMove = dispOppMove();
		numUserCharges++;
		updateChargeDisp();
		dispResult("charge", oppMove);
	});
	$("#fireball").click(function(){
		if(numUserCharges < 1){
			$(results).append("You don't have enough energy charged.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);
			return;
		}

		$("#results").append("You launch a ball of fire.<br>");
		$("#results").scrollTop($("#results")[0].scrollHeight);

		oppMove = dispOppMove();
		numUserCharges--;
		updateChargeDisp();
		dispResult("fireball", oppMove);
	});
	$("#barrier").click(function(){
		$("#results").append("You create a magical barrier in front of you.<br>");
		$("#results").scrollTop($("#results")[0].scrollHeight);
		oppMove = dispOppMove();
		dispResult("barrier", oppMove);
	});
	$("#thunderbolt").click(function(){
		if(numUserCharges < 2){
			$(results).append("You don't have enough energy charged.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);
			return;
		}

		$("#results").append("You hurl a spear of lightning.<br>");
		$("#results").scrollTop($("#results")[0].scrollHeight);

		oppMove = dispOppMove();
		numUserCharges -= 2;
		updateChargeDisp();
		dispResult("thunderbolt", oppMove);
	});
	$("#reflect").click(function(){
		$("#results").append("You create an aura that can redirect lightning attacks.<br>");
		$("#results").scrollTop($("#results")[0].scrollHeight);
		oppMove = dispOppMove();
		dispResult("reflect", oppMove);
	});
	$("#summon").click(function(){
		if(numUserCharges < 4){
			$(results).append("You don't have enough energy charged.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);
			return;
		}

		$("#results").append("You create a portal from which an enormous dragon emerges.<br>");
		$("#results").scrollTop($("#results")[0].scrollHeight);

		oppMove = dispOppMove();
		numUserCharges -= 4;
		updateChargeDisp();
		dispResult("summon", oppMove);
	});
	$("#howToPlay > .glyphicon-remove").click(function(){
		$("#howToPlay").hide();
	});
});

function updateChargeDisp(){
	if(numUserCharges == 1){
		$("#userCharges").text("You have 1 charge.");
	}
	else{
		$("#userCharges").text("You have " + numUserCharges + " charges.");
	}	

	if(numOppCharges == 1){
		$("#oppCharges").text("Your opponent has 1 charge.");
	}
	else{
		$("#oppCharges").text("Your opponent has " + numOppCharges + " charges.");
	}
}

function dispOppMove(){
	if(numOppCharges >= 4){ //summon
		var r = 6;
	} else if(numOppCharges >= 2){
		if(numUserCharges >= 2){ //charge barrier reflect fireball or thunderbolt
			var r = Math.floor(Math.random() * 5 + 1);
		} else if(numUserCharges == 0){ //charge fireball or thunderbolt
			var r = Math.floor(Math.random() * 3 + 1);
			if(r == 3){
				r = 4;
			}
		} else{ //charge barrier fireball or thunderbolt
			var r = Math.floor(Math.random() * 4 + 1);
		}
	} else if(numOppCharges >= 1){
		if(numUserCharges >= 2){ //charge barrier reflect or fireball
			var r = Math.floor(Math.random() * 4 + 1);
			if(r == 4){
				r = 5;
			}
		} else if(numUserCharges == 0){ //charge or fireball
			var r = Math.floor(Math.random() * 2 + 1);
		} else{ //charge barrier or fireball
			var r = Math.floor(Math.random() * 3 + 1);
		}
	} else{
		if(numUserCharges >= 2){ //charge barrier or reflect
			var r = Math.floor(Math.random() * 3 + 1);
			if(r == 2){
				r = 5;
			}
		} else if(numUserCharges == 0){ //charge
			var r = 1;
		} else{ //charge or barrier
			var r = Math.floor(Math.random() * 2 + 1);
			if(r == 2){
				r = 3;
			}
		}
	}
	
	switch(r){
		case 1:
			$("#results").append("Your opponent stopped to charge energy.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);

			numOppCharges++;
			updateChargeDisp();

			return "charge";
		case 2:
			$("#results").append("Your opponent launched a ball of fire.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);

			numOppCharges--;
			updateChargeDisp();

			return "fireball";
		case 3:
			$("#results").append("Your opponent created a magical barrier in front of them.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);
			return "barrier";
		case 4:
			$("#results").append("Your opponent hurled a spear of lightning.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);

			numOppCharges -= 2;
			updateChargeDisp();

			return "thunderbolt";
		case 5:
			$("#results").append("Your opponent created an aura that can redirect lightning attacks.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);
			return "reflect";
		case 6:
			$("#results").append("Your opponent created a portal from which an enormous dragon emerged.<br>");
			$("#results").scrollTop($("#results")[0].scrollHeight);

			numOppCharges -= 4;
			updateChargeDisp();

			return "summon";
	}
}

function dispResult(userMove, oppMove){
	switch(userMove){
		case "charge":
			switch(oppMove){
				case "charge":
					break;
				case "fireball":
					$("#results").append("You were incinerated! You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "barrier":
					break;
				case "thunderbolt":
					$("#results").append("You received lethal damage! You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "reflect":
					break;
				case "summon":
					$("#results").append("The dragon striked you with its claws and devoured you. You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
			}
			break;
		case "fireball":
			switch(oppMove){
				case "charge":
					$("#results").append("Your opponent was incinerated! You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "fireball":
					$("#results").append("You and your opponent were both incinerated! It's a tie.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "barrier":
					$("#results").append("Your fireball was stopped by your opponent's barrier.<br>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					break;
				case "thunderbolt":
					$("#results").append("Your opponent was incinerated, but you received lethal damage! It's a tie.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "reflect":
					$("#results").append("Your opponent's aura did nothing against your fireball. Your opponent was incinerated! You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "summon":
					$("#results").append("The dragon was hit by your fireball but didn't even seem to notice it. The dragon striked you with its claws and devoured you. You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
			}
			break;
		case "barrier":
			switch(oppMove){
				case "charge":
					break;
				case "fireball":
					$("#results").append("Your opponent's fireball was stopped by your barrier.<br>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					break;
				case "barrier":
					break;
				case "thunderbolt":
					$("#results").append("Your opponent's thunderbolt pierced through your barrier. You received lethal damage! You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "reflect":
					break;
				case "summon":
					$("#results").append("The dragon striked you with its claws, easily destroying your barrier, and then devoured you. You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
			}
			break;
		case "thunderbolt":
			switch(oppMove){
				case "charge":
					$("#results").append("Your opponent received lethal damage! You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "fireball":
					$("#results").append("Your opponent received lethal damage, but you were incinerated! It's a tie.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "barrier":
					$("#results").append("Your thunderbolt pierced through your opponent's barrier. Your opponent received lethal damage! You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "thunderbolt":
					$("#results").append("You and your opponent both received lethal damage! It's a tie.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "reflect":
					$("#results").append("Your opponent's aura bent the trajectory of your thunderbolt and sent it back at you. You received lethal damage! You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "summon":
					$("#results").append("The dragon was hit by your thunderbolt but didn't even seem to notice it. The dragon striked you with its claws and devoured you. You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
			}
			break;
		case "reflect":
			switch(oppMove){
				case "charge":
					break;
				case "fireball":
					$("#results").append("Your aura did nothing against your opponent's fireball. You were incinerated! You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "barrier":
					break;
				case "thunderbolt":
					$("#results").append("Your aura bent the trajectory of your opponent's thunderbolt and sent it back at them. Your opponent received lethal damage! You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "reflect":
					break;
				case "summon":
					$("#results").append("Your aura did nothing against the dragon. The dragon striked you with its claws and devoured you. You lose.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
			}
			break;
		case "summon":
			switch(oppMove){
				case "charge":
					$("#results").append("The dragon striked your opponent with its claws and devoured your opponent. You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "fireball":
					$("#results").append("The dragon was hit by the fireball but didn't even seem to notice it. The dragon striked your opponent with its claws and devoured your opponent. You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "barrier":
					$("#results").append("The dragon striked your opponent with its claws, easily destroying the barrier, and then devoured your opponent. You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "thunderbolt":
					$("#results").append("The dragon was hit by the thunderbolt but didn't even seem to notice it. The dragon striked your opponent with its claws and devoured your opponent. You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "reflect":
					$("#results").append("The aura did nothing against the dragon. The dragon striked your opponent with its claws and devoured your opponent. You win!<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
				case "summon":
					$("#results").append("The two dragons began fighting each other fiercely. You and your opponent were unable to escape being caught up in the fight and were both crushed. It's a tie.<br>");
					$("#results").append("<hr>");
					$("#results").scrollTop($("#results")[0].scrollHeight);
					numUserCharges = 0;
					numOppCharges = 0;
					updateChargeDisp();
					break;
			}
			break;
	}
	$("#results").append("<hr>");
	$("#results").scrollTop($("#results")[0].scrollHeight);
}