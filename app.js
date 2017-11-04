
function randomWithRange(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}


angular.module('social_vairables', [])
angular.module('App', ['ngCordova', 'ui.router','720kb.datepicker','zingchart-angularjs','social_vairables'])








.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $stateProvider

    .state('index', {
        url: '/index',

        templateUrl: 'index.html',
        controller: 'HomeCtrl'
    })
	
	

 .state('team_detail', {
        url: '/team_detail',

        templateUrl: 'team_detail.html',
	 
        controller: 'TeamDetailCtrl'
	
    })
	 .state('head_2_head', {
        url: '/head_2_head',

        templateUrl: 'head_2_head.html',
        controller: 'head_2_headCtrl'
    })
	
	   .state('premier_data', {
        url: '/league_details',

        templateUrl: 'league_details.html',
        controller: 'premier_dataCtrl'
    })
	
	  .state('history', {
        url: '/history',

        templateUrl: 'history.html',
        controller: 'historyCtrl'
    })

	  .state('player_details', {
        url: '/player_details',

        templateUrl: 'player_details.html',
        controller: 'player_detailsCtrl'
    })

      .state('continents', {
        url: '/continents',

        templateUrl: 'continents.html',
        controller: 'continentsCtrl'
    })
	  .state('world', {
        url: '/world',

        templateUrl: 'world',
        controller: 'worldCtrl'
    })
	
	  .state('country', {
        url: '/country',

        templateUrl: 'country.html',
        controller: 'countryCtrl'
    })
	
	.state('coach', {
        url: '/coach',

        templateUrl: 'coach.html',
        controller: 'coachCtrl'
    })
	
	  .state('score_details', {
        url: '/score_details',

        templateUrl: 'score_details.html',
        controller: 'score_detailsCtrl'
    })

	
 

    $sceDelegateProvider.resourceUrlWhitelist([
  
    'self',
   
    'http://api.datasportsgroup.com/**',
	'http://scores*.hihi2.com/**',
	'http://*.hihi2.com/**'
  ])


})





.controller('HomeCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window ,social) {
		



$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;

$scope.set_lang= function(lang)
{

		       $http({
            	method  : 'POST',
		        url  : '/set_lang',
                data : {"lang": lang},

        }).success(function(data, status, headers, config)
		{
			alert(data);

			
		});
}



$scope.getdata= function(FromDate)
{
		       $http({
            	method  : 'POST',
		        url  : '/get_matches_day',
                data : {"day": FromDate},

        }).success(function(data, status, headers, config)
		{
		window.localStorage.removeItem('set_date');
			

			 $scope.live_c = [];

		
			if(data.datasportsgroup.competition != null && data.datasportsgroup.competition != "undefined"){
            $scope.msg = false;
			
			try{
			
			$scope.xml = data.datasportsgroup.competition;
			
			$scope.match = data.datasportsgroup.competition.match;
			
			$scope.competition_name = data.datasportsgroup.competition.competition_name;
			$scope.area_name = data.datasportsgroup.competition.area_name;
			var data1=data.datasportsgroup.competition;
		
			var data2=data.datasportsgroup.competition.match;
			
			array_col2 = {};
			var compition_id;
			final_match_array=[];
			total_objects=0;
			
			}catch(e){};
			
			try{
			Object.keys(data1).forEach(function (key)
			{
				if(key>=0)
				{
					total_objects=2;
				}
				else
				{
					total_objects=1;
				}
			});
			
			}catch(e){
			}
				if(total_objects>1)
			{
				

				Object.keys(data1).forEach(function (key)
					{
						array_col=[];
array_col_match=[];
						array_col['$']=data1[key]['$'];
match_single=0;
try{
	Object.keys(data1[key]['match']).forEach(function (key1)
						{
							if(key1=='$')
{
match_single=1;
array_col_match[0]=data1[key]['match'];
array_col['match']=array_col_match;




if(data1[key]['match'][key1].status == 'Playing'){

$scope.live_c[key] = 'live';
$scope.live_match1 = 'live';

}



}

						});
					}catch(e){};
						
if(match_single==0)
{
	 try{


$scope.s_match =data1[key]['match'];
var sw;
 Object.keys($scope.s_match).forEach(function(key12)
{
	


   Object.keys($scope.s_match).forEach(function(key22)
  {
	  if(key22 >=0)
	  {
 		if( $scope.s_match[key12].$.time == $scope.s_match[key22].$.time)
		{    if($scope.s_match[key12].$.match_id < $scope.s_match[key22].$.match_id)
			{   sw = $scope.s_match[key22];
			   ($scope.s_match[key22]) = ($scope.s_match[key12]);
               ($scope.s_match[key12]) = (sw);
		     }
			


            			
		}else{
			


		    }
	  }
  });

});
array_col['match']=$scope.s_match;







Object.keys(data1[key]['match']).forEach(function (key1) {
						
if(data1[key]['match'][key1].$.status == 'Playing' || data1[key]['match'][key1].$.status == 'Break'){

$scope.live_c[key] = 'live';
$scope.live_match1 = 'live';

}

});


}catch(e){};

}
						final_match_array[key]=array_col;						

					});

			
			}
			else
			{
				try{
			
				final_match_array[0]=data1;
				
				Object.keys(final_match_array[0]).forEach(function (key)
						{
							if(key=='match')
					{
                                                        array_col1=[];

                                       Object.keys(final_match_array[0]['match']).forEach(function (key1)
				{
							if(key1=='$')
{

array_col1[0]=final_match_array[0]['match'];
if(final_match_array[0]['match'][key1].status == 'Playing' || final_match_array[0]['match'][key1].status == 'Break'){

$scope.live_c[key] = 'live';
$scope.live_match1 = 'live';

}

}else{
$scope.s_match=final_match_array[0]['match'];

 var sw;
 Object.keys($scope.s_match).forEach(function(key12)
{
	


   Object.keys($scope.s_match).forEach(function(key22)
  {
	  if(key22 >=0)
	  {
 		if( $scope.s_match[key12].$.time == $scope.s_match[key22].$.time)
		{    if($scope.s_match[key12].$.match_id < $scope.s_match[key22].$.match_id)
			{   sw = $scope.s_match[key22];
			   ($scope.s_match[key22]) = ($scope.s_match[key12]);
               ($scope.s_match[key12]) = (sw);
		     }
			


            			
		}else{
			


		    }
	  }
  });

});
array_col1=$scope.s_match;





if(final_match_array[0]['match'][key1].$.status == 'Playing' || final_match_array[0]['match'][key1].$.status == 'Break'){

$scope.live_c[key] = 'live';
$scope.live_match1 = 'live';

}
}
												

					});			
				
							
					}
						});


						
				final_match_array[0]['match']=array_col1;
				
			}catch(e){
			};	
			}
		
			$scope.skk_match =  final_match_array;
         
           $scope.sk_at_srr=[18,417,19,11,416,304,44,358,353,354,355,356,323,500,226,305,27,432,431,480,400,401,28,6,406,418,2,402,62,8,403,388,3,57,58,4,407,408,10,236,254,295,325,779,396,221,222];
           $scope.final_sk=[];
   Object.keys($scope.sk_at_srr).forEach(function(key1)
 {
   Object.keys($scope.skk_match).forEach(function(key2)
  {
	  
 		if( $scope.sk_at_srr[key1] == $scope.skk_match[key2].$.competition_id)
		{    
	       $scope.final_sk[key1]= $scope.skk_match[key2];
            			
		}
	  
  });

});


$scope.mast=[];
 var m=0;
   Object.keys($scope.final_sk).forEach(function(key3)
 {

   if($scope.final_sk[key3] != undefined)
	 {  if(m == 0)
		 {
			
		 }
		
		$scope.mast.push($scope.final_sk[key3]);
		 ++m;
	 }else
	 {
		 m=m;
	 }
		
 });
$scope.match1=$scope.mast;
$scope.Smatch1=$scope.mast;
$scope.sk_teams=[];
$scope.sk_teams=social.teams;

$scope.req_match=[];
$scope.con;
   Object.keys($scope.sk_teams).forEach(function(key1)
 {  
        Object.keys($scope.Smatch1).forEach(function(key2)
 { 
 
 Object.keys($scope.Smatch1[key2]).forEach(function(key3)
 {
	  if(key3=='$')
        {  
             $scope.con=($scope.Smatch1[key2][key3].competition_id);
        }
 if(key3=='match')
 {
	
Object.keys($scope.Smatch1[key2][key3]).forEach(function(key4)
 {  
    if( ($scope.Smatch1[key2][key3][key4].$.team_a_id == $scope.sk_teams[key1]) || ($scope.Smatch1[key2][key3][key4].$.team_b_id == $scope.sk_teams[key1]))
	{
	      $scope.req_match.push({sk:$scope.Smatch1[key2][key3][key4],com:$scope.con});	
        	  
	}

 
 });
	
 }
 });
 
 
 });
 
 });

 $scope.du_match=[];

	var keys = Object.keys($scope.req_match);
             var len = keys.length;
			
 Object.keys($scope.req_match).forEach(function(key5)
 {
   if(parseInt(key5)< (len-1)){
	
    if(($scope.req_match[parseInt(key5)].sk.$.team_a_id == $scope.req_match[parseInt(key5)+1].sk.$.team_a_id) && ($scope.req_match[parseInt(key5)].sk.$.team_b_id == $scope.req_match[parseInt(key5)+1].sk.$.team_b_id) )
   {
	   
   }else{
	    $scope.du_match[key5]=($scope.req_match[key5]);
		
   }
   
   }
  else{
	   $scope.du_match[key5]=($scope.req_match[key5]);
    }

 });

  $scope.du_match1=[];
  var t=0;

	var keys = Object.keys($scope.du_match);
             var len1 = keys.length;
			
			 if(len1==1)
			 {  if($scope.du_match[len1-1]==undefined){$scope.test=$scope.du_match[len1]}else{$scope.test=$scope.du_match[len1-1]}
				 }else{if($scope.du_match[len1]==undefined){$scope.test=$scope.du_match[len1-1];}else{$scope.test=$scope.du_match[len1];}}
	

 Object.keys($scope.du_match).forEach(function(key5)
 {
   
	
    if((($scope.du_match[parseInt(key5)].sk.$.team_a_id==$scope.test['sk'].$.team_a_id) && ($scope.du_match[parseInt(key5)].sk.$.team_b_id==$scope.test['sk'].$.team_b_id)) && ( t==0 ))
   { 
	   $scope.du_match1[key5]=($scope.du_match[key5]);
        t=1;	   
   }else if(($scope.du_match[parseInt(key5)].sk.$.team_a_id!=$scope.test['sk'].$.team_a_id) && ($scope.du_match[parseInt(key5)].sk.$.team_b_id!=$scope.test['sk'].$.team_b_id)){
	   
	    $scope.du_match1[key5]=($scope.du_match[key5]);
		
   }
   
   
  
    

 });
 
 


$scope.ksk=[];
 var m1=0;
   Object.keys($scope.du_match1).forEach(function(key3)
 {

   if($scope.du_match1[key3] != undefined)
	 {  if(m1 == 0)
		 {
			
		 }
		
		$scope.ksk.push($scope.du_match1[key3]);
		 ++m1;
	 }else
	 {
		 m1=m1;
	 }
		
 });




 $scope.array=$scope.ksk;

  var swap;
 Object.keys($scope.array).forEach(function(key12)
{
	


   Object.keys($scope.array).forEach(function(key22)
  {
	  if(key22 >=0)
	  {  
 		    if($scope.array[key12].sk.$.time < $scope.array[key22].sk.$.time)
			{   swap = $scope.array[key22];
			    ($scope.array[key22]) = ($scope.array[key12]);
                ($scope.array[key12]) = (swap);
		    }else if(($scope.array[key12].sk.$.time == $scope.array[key22].sk.$.time) && ($scope.array[key12].sk.$.team_a_id != $scope.array[key22].sk.$.team_a_id))
			{
			  
		       
		    }
         		
			}

	 
  });

});

$scope.let_arr =[];

	var keys = Object.keys($scope.array);
             var len1 = keys.length;
			
 Object.keys($scope.array).forEach(function(key5)
 {
   if(parseInt(key5)< (len1-1)){
	
    if(($scope.array[parseInt(key5)].sk.$.team_a_id == $scope.array[parseInt(key5)+1].sk.$.team_a_id) && ($scope.array[parseInt(key5)].sk.$.team_b_id == $scope.array[parseInt(key5)+1].sk.$.team_b_id) )
   {
	  
   }else{
	    $scope.let_arr.push($scope.array[key5]);
		 
   }
   
   }
  else{
	   $scope.let_arr.push($scope.array[key5]);
    }

 });
 		       

$scope.final_mat_team = $scope.let_arr;
$scope.ar_len=$scope.final_mat_team.length;







	 }else{
$scope.msg = true;}	
			

     $('#loader_outer').hide();
			

        }).error(function(data, status, headers, config) {
            
        });

    }
	
	
	
	
	  $scope.xml = '';

		var date2 = moment.utc();
	    $scope.FromDate =  date2.year() + '-' + (date2.month() + 1) + '-' +  ('0' + date2.date()).slice(-2); 	
		$scope.getdata($scope.FromDate);
		
		
          	window.setInterval(function(){
			
			var d = $('.myclass').attr('date-id');
		var y1 = d.substring(0,4);
		  var m1 = d.substring(4,6);
		   var d1 = d.substring(6,8);
		
		   var dd = y1+'-'+m1+'-'+d1;
		
		
		   var date2 = moment.utc();
	    var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
           var date4 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' + date2.date();
		
		
		   if(dd == date3){$scope.getdata(date3);

                }else if(dd == date4){$scope.getdata(date3);
                        }
			

              }, 60000);



                 $scope.go_to_page1 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
           
        });
		

          }
		
		  $scope.check_time2= function(team_a, team_b, comp_id, mat_id, time){
			
				
		   var now = moment();
		    var h = now.hour() > 12 ? now.hour() - 12 : now.hour();
         
		   var m = now.minutes();
		
		   var hours = time.substring(0,2);
		   var min = (time.substring(5,2)).slice(-2);
		
		  
		
		
			  if(h == hours){
				  var diff = m - min;
				
				
				  if(diff < 30){
					
					
					 	  window.location.href='./score_details.html?f_id='+team_a+'&s_id='+team_b+'&cid='+comp_id+'&match_id='+mat_id;
					
					
				  }
				
			  }else{
				
				  window.location.href='./time_details.html?f_id='+team_a+'&s_id='+team_b+'&cid='+comp_id+'&match_id='+mat_id;
			  }
			
			
			
			
			
			
			
			
			
			
		  }
		
	
	$scope.live_match = function(match, a_id, b_id){

		
       $http({
		
		  		
            	 method  : 'POST',
	           	url  : '/get_matches',
                data : {"type": "match","id":match,"detailed":"yes"},




        }).success(function(data, status, headers, config)
		{
			
			
		

                     try{    $scope.goals = data.datasportsgroup.competition.season.rounds.match.events.goals.event ;
					 }catch(e){ try{$scope.goals = data.datasportsgroup.competition.season.rounds.playoff.match.events.goals.event ; }catch(e){
					 $scope.goals = data.datasportsgroup.competition.season.rounds.group.match.events.goals.event ; }}
              

                     try{
                        Object.keys($scope.goals).forEach(function (key8)
			{  if(key8 == 0){
                         if($scope.goals[key8].$.team_id == a_id){ //alert(a_id);

                            $scope.score_team_a = 1;
                            $scope.score_team_b = 0;
                            $scope.opponent_team = 'team-b';
                            $scope.opponent_team_score = 0;
                             $scope.win_team = 'team-a';
                            $scope.win_team_score = 1;

                             window.localStorage.setItem('score_team_a',$scope.score_team_a);
                               window.localStorage.setItem('score_team_b',$scope.score_team_b);




                           }else{
                              $scope.score_team_b = 1;
                            $scope.score_team_a = 0;
                            $scope.opponent_team = 'team-a';
                             $scope.opponent_team_score = 0;

                            $scope.win_team = 'team-b';
                            $scope.win_team_score = 1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a);
                              window.localStorage.setItem('score_team_b',$scope.score_team_b);




                            }
                          }

                          if(key8 == 1){
                         if($scope.goals[key8].$.team_id == a_id){

                            $scope.score_team_a1 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team1= 'team-b';
                            $scope.opponent_team_score1 = window.localStorage.getItem('score_team_b');
                              $scope.win_team1 = 'team-a';
                            $scope.win_team_score1 = parseInt(window.localStorage.getItem('score_team_a'))+1;

                            window.localStorage.setItem('score_team_a',$scope.score_team_a1);





                           }else{

                            $scope.score_team_b1 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team1 = 'team-a';
                            $scope.opponent_team_score1 = parseInt(window.localStorage.getItem('score_team_a'));

                              $scope.win_team1 = 'team-b';
                            $scope.win_team_score1 = parseInt(window.localStorage.getItem('score_team_b'))+1;


                              window.localStorage.setItem('score_team_b',$scope.score_team_b1);




                             }
                          }


                       if(key8 == 2){
                         if($scope.goals[key8].$.team_id == a_id){

                            $scope.score_team_a2 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team2= 'team-b';
                            $scope.opponent_team_score2 = window.localStorage.getItem('score_team_b');

                              $scope.win_team2 = 'team-a';
                            $scope.win_team_score2 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a2);

                           }else{

                            $scope.score_team_b2 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team2 = 'team-a';
                            $scope.opponent_team_score2 = window.localStorage.getItem('score_team_a');
                              $scope.win_team2 = 'team-b';
                            $scope.win_team_score2 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b2);







                             }
                          }


                            if(key8 == 3){
                              if($scope.goals[key8].$.team_id == a_id){

                            $scope.score_team_a3 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team3= 'team-b';
                            $scope.opponent_team_score3 = window.localStorage.getItem('score_team_b');

                              $scope.win_team3 = 'team-a';
                            $scope.win_team_score3 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a3);

                           }else{

                            $scope.score_team_b3 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team3 = 'team-a';
                            $scope.opponent_team_score3 = window.localStorage.getItem('score_team_a');
                              $scope.win_team3 = 'team-b';
                            $scope.win_team_score3 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b3);







                             }
                          }



                              if(key8 == 4){
                              if($scope.goals[key8].$.team_id == a_id){

                            $scope.score_team_a4 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team4= 'team-b';
                            $scope.opponent_team_score4 = window.localStorage.getItem('score_team_b');

                              $scope.win_team4 = 'team-a';
                            $scope.win_team_score4 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a4);

                           }else{

                            $scope.score_team_b4 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team4 = 'team-a';
                            $scope.opponent_team_score4 = window.localStorage.getItem('score_team_a');
                              $scope.win_team4 = 'team-b';
                            $scope.win_team_score4 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b4);







                             }
                          }


                        });





 }catch(e){};


		

		
			
	
			

        }).error(function(data, status, headers, config) {
            
        });

	
	}

$(document).ready(function () {
    $('.cal-cell').click(function () {
		if(window.localStorage.getItem('startdate')){
			var d = $('.start').attr('date-id');
		var y1 = d.substring(0,4);
		  var m1 = d.substring(4,6);
		   var d1 = d.substring(6,8);
		
		   var dd = y1+'-'+m1+'-'+d1;
		}else{
			var d = $('.start').attr('date-id');
			var y1 = d.substring(0,4);
		  var m1 = d.substring(4,6);
		   var d1 = d.substring(6,8);
		
		   var dd = y1+'-'+m1+'-'+d1;
			
			
		}
		
		
		
		
        $scope.getdata(dd);
		
		
    });
});



	
	$scope.selectDate = function(dt) {
		var d = new Date(dt);
       $scope.dt1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + ('0' + d.getDate()).slice(-2);
	     $scope.getdata($scope.dt1);
         cyear(dt);
      }
	
	
	
	
	$scope.search_item = function() {
		
       alert("Todo");

      }



	
  $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		

		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };




    	 $http({
			method  : 'POST',
			url  : '/get_areas',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
                              }).success(function(data, status, headers, config)
	                     	{
			
		
			                arc=[];
			                arc_lg=[];
			

			                   $scope.area = data.datasportsgroup.area;
			

                               							
			
			             Object.keys($scope.area).forEach(function (key)
				         {
						     if(($scope.area[key].$.parent_area_id==1) && ($scope.area[key].$.area_id<=7 && $scope.area[key].$.area_id!=6))
							 {
					         arc.push($scope.area[key]);					
							 }
							  if($scope.area[key].$.area_id==68 ||$scope.area[key].$.area_id==76 ||$scope.area[key].$.area_id==80 || $scope.area[key].$.area_id==100||$scope.area[key].$.area_id==164 || $scope.area[key].$.area_id==176)
							 {
								
					         arc_lg.push($scope.area[key]);
							
							 $scope.area_name=$scope.area[key].$.name;
							
							
							 }
						});
		
                        $scope.cont=arc;						
			

						 $scope.league=arc_lg;
					
			



                             }).error(function(data, status, headers, config) {
                            
                          });

						
	
$scope.national=function(value)
{
	
	

	window.location.href = './country.html?cnt_id='+value;
}
$scope.continents=function(value)
{

	

	window.location.href = './continents.html?con_id='+value;
}

		    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
  
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	
  
	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            
        });


		
		


		
		




	})
	
	

	
.controller('TeamDetailCtrl', function($scope, $rootScope, $http, $state, $filter,social) {
		
		
		$scope.tabs = [{
            title: 'overview',
            url: 'one.tpl.html'
        }, {
            title: 'Matches',
            url: 'two.tpl.html'
        },
        {
            title: 'Squad',
            url: 'three.tpl.html'
        }];
		
		
		
		
		  $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
		
		
		
	$scope.myStyle={'color':'black'}
	$scope.season_id='';	
		
	


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;	
		
		
		
		
		
		
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
		
		
		
		 $scope.t_id = (getParameterByName('id'));
         $scope.c_name = (getParameterByName('cid'));
		  var venue_id='';
		

	
		


          $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": $scope.c_name},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id  = data.datasportsgroup.competition.season[0].$.season_id;
                            $scope.season_title  = data.datasportsgroup.competition.season[0].$.title;

                           }else{
		
			 $scope.season_id  = data.datasportsgroup.competition.season.$.season_id;
                          $scope.season_title  = data.datasportsgroup.competition.season.$.title;
                         }
			

                        $scope.league_name1  = data.datasportsgroup.competition.$.name;
                        $scope.league_id1  = data.datasportsgroup.competition.$.competition_id;
                        $scope.area_name  = data.datasportsgroup.competition.$.area_name;
                        $scope.area_id1  = data.datasportsgroup.competition.$.area_id;


			
			window.localStorage.setItem('s1_id',$scope.season_id);			
	
			

        }).error(function(data, status, headers, config) {
            
        });

	
		

	
	
	  		  	var arr_req= [];
			
		
	$scope.get_first_match = function(first_id, loc_val, com_id){

 $scope.show_logo1 = 'true';
			
		      $('#loader_outer3').show();	
		
		$scope.loc_val = loc_val;
		
	  $http({
            	method  : 'POST',
		url  : '/get_team',
                data : {"team": first_id, "limit":"45"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
			
			$scope.comps_name= [];
			$scope.comps_id= [];
			var all_comps=[];
			var all_comps1=[];
			
		
			
			var arr = [];
			
			
				$scope.team_name = data.datasportsgroup.team.$.short_name;
				
			$scope.next_match_vs = data.datasportsgroup.team.next_matches.match[0].$.date;
            if($scope.t_id==data.datasportsgroup.team.next_matches.match[0].$.team_b_id)
			{ 	
			   $scope.openent_team=data.datasportsgroup.team.next_matches.match[0].$.team_a_name;
			}
			else
			{
				$scope.openent_team=data.datasportsgroup.team.next_matches.match[0].$.team_b_name;
			}
			
		     		
			venue_id = data.datasportsgroup.team.team_extra.$.primary_venue_id;
			
			$scope.team_logo = data.datasportsgroup.team.team_extra.$.team_logo;
			


			$scope.season_id = data.datasportsgroup.team.next_matches.match[0].$.season_id;
	      venue1(venue_id);
			
			
			
			
			$scope.required_seasons1 = function(id){
				
				$scope.last_match1 = data.datasportsgroup.team.last_matches.match;
			    $scope.next_match = data.datasportsgroup.team.next_matches.match;
				
			 $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml2 = data.datasportsgroup.competition.season ;
				
				
					Object.keys($scope.last_match1).forEach(function (key)
				{
					Object.keys($scope.xml2).forEach(function (key2)
				{
					
					
					if($scope.xml2[key2].$.season_id == $scope.last_match1[key].$.season_id){
						
						all_comps.push($scope.last_match1[key]);
					}
					
				});
					
				});
				
				
						Object.keys($scope.next_match).forEach(function (key)
				{
					Object.keys($scope.xml2).forEach(function (key2)
				{
					
					
					if($scope.xml2[key2].$.season_id == $scope.next_match[key].$.season_id){
						
						all_comps1.push($scope.next_match[key]);
					}
					
				});
					
				});
				
				
				
				
				$scope.last_match1 = all_comps;
				$scope.next_match = all_comps1;
				
			   $scope.get_val1($scope.loc_val);
			



			
					
	
			

        }).error(function(data, status, headers, config) {
            
        });
				
			}
			
				
			if(com_id != 1 && com_id != '' && !isNaN(com_id)){
			  $scope.required_seasons1(com_id);
			
			
			}else{$scope.last_match1 = data.datasportsgroup.team.last_matches.match;
               	$scope.next_match = data.datasportsgroup.team.next_matches.match;
				
					
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match1).forEach(function (key)
				{
				if(key != 0){
					if($scope.last_match1[key].$.team_a_id == first_id){
					arr.push($scope.last_match1[key]);
					}		
				}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match1).forEach(function (key1)
				{
					if(key1 != 0){
					if($scope.last_match1[key1].$.team_b_id == first_id){
					arr.push($scope.last_match1[key1]);
					}	
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match1).forEach(function (key2)
				{
					if(key2 != 0){
					arr.push($scope.last_match1[key2]);
					}			
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match).forEach(function (key)
				{
					if($scope.next_match[key].$.team_a_id == first_id){
					arr.push($scope.next_match[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match).forEach(function (key1)
				{
					if($scope.next_match[key1].$.team_b_id == first_id){
					arr.push($scope.next_match[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match).forEach(function (key2)
				{
					
					arr.push($scope.next_match[key2]);
										
				});
			}
			
			
					    $scope.total_match = arr;
				
			$scope.make_comps1 = function(){
			
			
				Object.keys($scope.total_match).forEach(function (key9) {
			 

				
					try{
				
					var sea_id = $scope.total_match[key9].$.season_id;
					
					
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{

        
				$scope.comps_name[key9]= data.datasportsgroup.competition.$.name;
			$scope.comps_id[key9]= data.datasportsgroup.competition.$.competition_id;
				
		
				}catch(e){};

		

        }).error(function(data, status, headers, config) {
           
        });
	  			

         }catch(e){};
				
				
				});
		
				
				}
			
				 $scope.show_logo1 = 'false';
			
		      $('#loader_outer3').hide();

              var arr1 = Object.keys($scope.total_match).map(function(k) { return $scope.total_match[k] });
			


			
			
             var len = arr1.length;
		  
            if(loc_val == 'home_away'){$scope.currentPage = 4;}
			if(loc_val == 'home'){$scope.currentPage = 0;}
			if(loc_val == 'away'){$scope.currentPage = 0;}
	
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
              
		return $scope.currentPage >= ((len/$scope.pageSize) - 1);
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);
		


	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);

		


    }

    init();
			
				
  				}
			  	
				
		
				$scope.get_val1 = function(loc_val){
				
				
			
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match1).forEach(function (key)
				{
					if($scope.last_match1[key].$.team_a_id == first_id){
					arr.push($scope.last_match1[key]);
					}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match1).forEach(function (key1)
				{
					if($scope.last_match1[key1].$.team_b_id == first_id){
					arr.push($scope.last_match1[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match1).forEach(function (key2)
				{
					
					arr.push($scope.last_match1[key2]);
										
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match).forEach(function (key)
				{
					if($scope.next_match[key].$.team_a_id == first_id){
					arr.push($scope.next_match[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match).forEach(function (key1)
				{
					if($scope.next_match[key1].$.team_b_id == first_id){
					arr.push($scope.next_match[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match).forEach(function (key2)
				{
					
					arr.push($scope.next_match[key2]);
										
				});
			}
			
			
					    $scope.total_match = arr;
				
			
			   $scope.make_comps2 = function(){
			
				Object.keys($scope.total_match).forEach(function (key)
				{
					
				
					var sea_id = $scope.total_match[key].$.season_id;
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{

       
			$scope.comps_name[key]= data.datasportsgroup.competition.$.name;
			$scope.comps_id[key]= data.datasportsgroup.competition.$.competition_id;	
				}catch(e){};



        }).error(function(data, status, headers, config) {
            
        });
	  			


				
				
				});
			   }
			 
			    $scope.show_logo1 = 'false';
			
		      $('#loader_outer3').hide();
				


              var arr1 = Object.keys($scope.total_match).map(function(k) { return $scope.total_match[k] });
			
			
			
             var len = arr1.length;
		
            if(loc_val == 'home_away'){$scope.currentPage = 0;}
			if(loc_val == 'home'){$scope.currentPage = 0;}
			if(loc_val == 'away'){$scope.currentPage = 0;}
	
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
		
			return $scope.currentPage == 0;
    	}

		return $scope.currentPage >= ((len/$scope.pageSize) - 1);
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);
	
	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);

	
    }

    init();
			
		
			
				}
			
				try{
		    $scope.name1=data.datasportsgroup.team.$.short_name;
			$scope.t_id1=data.datasportsgroup.team;
			
			venue_id = data.datasportsgroup.team.team_extra.primary_venue_id;
			
				}catch(e){};
			
		
				
			try{
	
			$scope.team_name = data.datasportsgroup.team.$.short_name;
			if(!$scope.team_name){
				$scope.team_name = data.datasportsgroup.team.$.current_team_name;
			}
			
			$scope.area_id1 = data.datasportsgroup.team.$.area_id;
			
			    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			
			
			
		
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               var arr_dcl=[];	
                          							
			                 arr_dcl.push({name:'All Competition', id:1});
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id == $scope.area_id1)
							 {
					         arr_dcl.push($scope.comp[key]);
							
							
							 }
						});
		

						   $scope.compeetts=arr_dcl;
						
			

        }).error(function(data, status, headers, config) {
            
        });

			
			
			
			
			
			}catch(e){};
			
			try{
			$scope.next_match_vs = data.datasportsgroup.team.next_matches.match[0].date;
			}catch(e){};
		
			
	

		
		
		
		
		
		
		
		
		
		
		
			

        }).error(function(data, status, headers, config) {
            
        });
	  	
	
	}
	
	

	
	$scope.get_first_match($scope.t_id,'home_away',1);
	
		$scope.change_home = function(id1, id2){
	
		
		           if(id1 == 1 || id1 == 'Home & Away'){$scope.get_first_match($scope.t_id,'home_away',id2);
				
			
		            }else if(id1 == '2'){
			            $scope.get_first_match($scope.t_id,'home',id2);
		                }else{$scope.get_first_match($scope.t_id,'away',id2);
		                }
		
	             }
				
				 	$scope.change_home1 = function(id1){
	                $scope.get_squad1(id1);
				
                   }
				
				 $scope.get_squad1 = function(id1){
					
					  $scope.show_logo4 = 'true';
		  $('#loader_outer1').show();
		  $('#loader_outer3').show();
					
				final_stats=[];
                player_stats=[];
					$scope.player_pic =[];
				$scope.player_name =[];
				$scope.player_age =[];
					$scope.nationality =[];
					$scope.player_pos =[];
					$scope.player_id =[];
					
					
					if(id1 != 1 && id1 != ''){				
   $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id1},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id1  = data.datasportsgroup.competition.season[0].$.season_id;
                            $scope.season_title1  = data.datasportsgroup.competition.season[0].$.title;

                           }else{
		
			 $scope.season_id1  = data.datasportsgroup.competition.season.$.season_id;
                          $scope.season_title1  = data.datasportsgroup.competition.season.$.title;
                         }
			




			

        }).error(function(data, status, headers, config) {
            
        });
					
					
					}else{
						$scope.season_id1 = $scope.season_id ;
					}		
	
                   function get_statisticks(id,k){
				

		            	 $http({
            	               method  : 'POST',
		                      url  : '/get_peoples',
                               data : {"id": id},

                              headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                             'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			

			
			
			
		
			
			                    $scope.player = data.datasportsgroup.people;
								
								 $scope.player_id[k] = $scope.player.$.people_id;
								$scope.player_pic[k] = $scope.player.$.player_picture;
				                $scope.player_name[k] = $scope.player.$.match_name;
								$scope.player_pos[k] = $scope.player.$.position;
				               $scope.player_age[k] = $scope.player.$.date_of_birth;
							   $scope.nationality[k] = $scope.player.$.nationality;
								
                                            array_col=[];
											 $scope.flag=0;

                           Object.keys($scope.player.membership).forEach(function (key)
						{
							if(key == '$'){
								try{
								if($scope.player.membership[key].team_id == $scope.t_id){


                                    Object.keys($scope.player.membership.season_statistic).forEach(function (key1)
						{
							if(key1=='$'){
								
								if($scope.player.membership.season_statistic[key1].season_id  == $scope.season_id1){
									
									array_col.push({ detail: $scope.player.membership.season_statistic[key1]});
									
								}
								
								
								
							}else{
								
								if($scope.player.membership.season_statistic[key1].$.season_id  == $scope.season_id1){
									
										array_col.push({ detail: $scope.player.membership.season_statistic[key1]});
									
								}
								
								
							     }
							
							
                        });
						
						
                                    }
							}catch(e){};


							}else{
							
							   if(!isNaN(key) &&  $scope.flag == 0){
							
							try{
							
								 	if($scope.player.membership[key].$.team_id == $scope.t_id){
										
                                    $scope.flag += 1;

                                    Object.keys($scope.player.membership[key].season_statistic).forEach(function (key1)
						{
							if(key1=='$'){
								
								if($scope.player.membership[key].season_statistic[key1].season_id  == $scope.season_id1){
									
										array_col.push({ detail: $scope.player.membership[key].season_statistic[key1]});
									
								}
								
								
								
							}else{
								
								if($scope.player.membership[key].season_statistic[key1].$.season_id  == $scope.season_id1){
									
										array_col.push({ detail: $scope.player.membership[key].season_statistic[key1]});
									
								}
								
								
							     }
							
							
                        });
                                    }
									
							}catch(e){
							}	
							}

                            }

						});
						
						







			                  
                                               final_stats[k] = array_col[0];
                                            


			
			if(k<(peoples_id.length)-1)
                {
  $scope.player_stats = final_stats;


                  }
			

                             }).error(function(data, status, headers, config) {
                           
                            });

	
	
	            }
	
			 for( var k=0;k<(peoples_id.length);k++){
	
	               get_statisticks(peoples_id[k],k);

                 if(k == (peoples_id.length)-1){
				$scope.show_logo4 = 'false';
		  $('#loader_outer1').hide();
	
					
				 }

	
	             }
		
				 $scope.res = final_stats;
				
				 }
	
	
	
	  function venue1(v1){
	
		 $http({
			
            	method  : 'POST',
		url  : '/get_venue',
                data : {"id": venue_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
				

        }).success(function(data, status, headers, config)
		{
			


			
			
			
			var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
			$scope.day = ('0' + date.getDate()).slice(-2);
			
			
			
			
			
			$scope.name = data.datasportsgroup.venue.$.name;
			$scope.city = data.datasportsgroup.venue.$.city;
				$scope.capacity = data.datasportsgroup.venue.$.capacity;
					$scope.area = data.datasportsgroup.venue.$.area;
						$scope.adress = data.datasportsgroup.venue.$.adress;
							$scope.adress_zip = data.datasportsgroup.venue.$.adress_zip;
								$scope.nicknames = data.datasportsgroup.venue.$.nicknames;
								$scope.surface = data.datasportsgroup.venue.$.surface;
								$scope.lati = data.datasportsgroup.venue.$.geo_latitude;
								$scope.longi = data.datasportsgroup.venue.$.geo_longtitude;
                                  		

		window.localStorage.setItem('lat',$scope.lati);
			window.localStorage.setItem('long',$scope.longi);
						window.localStorage.setItem('name',$scope.name);
			
			
			
			$scope.selectDate = function(dt) {
     

      }
			


			

        }).error(function(data, status, headers, config) {
           
        });
		


	  }

	
	

 $scope.xml = '';

          $http({
		method  : 'POST',
		url  : '/get_season_team',
            
                data : {"season_id":window.localStorage.getItem('s1_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
			
		
			
			
			
		
			 $scope.teams  = data.datasportsgroup.competition.season.team;
			

			

			
	
			

        }).error(function(data, status, headers, config) {
           
        }); 	
	
	
	
	
	 

	
	$scope.tabs1 = [{
            title: 'Overview',
            url: 'sub.one.tpl.html'
        }, {
            title: 'Statistics',
            url: 'sub.two.tpl.html'
        }];
		
		
		
		
		
		
		  $scope.currentTab1 = 'sub.one.tpl.html';



    $scope.isActiveTab1 = function(tabUrl1) {
        return tabUrl1 == $scope.currentTab1;
		
		
    }
		
	$scope.myStyle={'color':'black'}	
	
			
		
		
		

	
	

		  $http({
            	  method  : 'POST',
		url  : '/get_squad',
                data : {"team": $scope.t_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{
			


			
	         var d = new Date();
         $scope.current_year = d.getFullYear();

			
			

			$scope.people = data.datasportsgroup.team.people;
			$scope.people1 = data.datasportsgroup.staff.people;
			
			
			peoples_id=[];

			var keys = Object.keys($scope.people);
             var len = keys.length;
			
			
			var i=0;
			while(i<len)
			{
	     		peoples_id[i]=data.datasportsgroup.team.people[i].$.people_id;
				i=i+1;
				
			}
		
			
			
			
			array_final2=[]
			
			Object.keys($scope.people1).forEach(function (key)
			{
				if(key>=0)
				{
					total_objects=2;
				}
				else
				{
					total_objects=1;
				}
			});
			if(total_objects>1)
			{
			$scope.staff=$scope.people1;	
			}else{
			Object.keys($scope.people1).forEach(function (key)
						{
							if(key=='$')
					{
							array_col1=[];
							array_col1[0]=$scope.people1;
					}
					
						});
						
		        $scope.staff=array_col1;
			}		
				



			
		
		
        }).error(function(data, status, headers, config) {
          
        });
	



 $scope.onClickTab1 = function (tab1) {
        $scope.currentTab1 = tab1.url;
		
		
		if($scope.currentTab1 == 'sub.two.tpl.html')
		{
	         $scope.get_squad1(1);
		
		}
        }
	
	     $('#loader_outer').hide();


    
    $scope.teams_id=function(value){
		
		window.location.href = './team_detail.html?id='+value+'&cid='+$scope.c_name;
		

	   }
	
	
	
		     $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
            
        });
		

          }
		
			
	
  $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		

		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };

	

	    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
 
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	
 
	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
           
        });



	
	
	})
	
.directive('myMap', function() {
   
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

       
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 3,//4
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

      
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

       
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); 

            google.maps.event.addListener(marker, 'click', function () {
               
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
               
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

       
        initMap();

        setMarker(map, new google.maps.LatLng(window.localStorage.getItem('lat'),window.localStorage.getItem('long')), '', window.localStorage.getItem("name"));
        
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };




	



	})	
	 	
	
	

	
	
	
	

	
	

.controller('premier_dataCtrl', function($scope,$filter, $rootScope, $http, $state, $stateParams, $window, social) {
		

	


 	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

               $scope.league_id = (getParameterByName('id'));
	           $scope.comp_id = (getParameterByName('comp_id'));
               $scope.cnt_id = (getParameterByName('cnt_id'));
              window.localStorage.setItem('compi_id',$scope.comp_id);
              var compid = $scope.comp_id;
			  var season_d;


$scope.league_fun = function(comp_id , season_id){
	
	
	
	
$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
	
	
		$scope.tabs = [{
            title: 'Overview',
            url: 'one.tpl.html'
        }, {
            title: 'League Tables',
            url: 'two.tpl.html'
        },
        {
            title: 'History',
            url: 'three.tpl.html'
        }];
		
		
		
		 $scope.array = ["total","home","away"];
		  $scope.array_first = "total";
		
		  $scope.total = 'true';
                  $scope.home = 'false';
                  $scope.away = 'false';


            $scope.currentTab = 'one.tpl.html';




	$scope.tabs1 = [{
            title: 'Topscorers',
            url: 'sub.one.tpl.html'
        }, {
            title: 'Assists',
            url: 'sub.two.tpl.html'
        },
		{
            title: 'Bookings',
            url: 'sub.three.tpl.html'
        }];
		
		
		
		
		
		
		  $scope.currentTab1 = 'sub.one.tpl.html';



    $scope.isActiveTab1 = function(tabUrl1) {
        return tabUrl1 == $scope.currentTab1;
		
		
    }
	
	


	







    if( season_id =='' || season_id == null)
   {


          $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": $scope.comp_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id  = data.datasportsgroup.competition.season[0].$.season_id;
                            $scope.season_title  = data.datasportsgroup.competition.season[0].$.title;
                            $scope.season_title_selected  = data.datasportsgroup.competition.season[0].$.title;

                           }else{
		
			     $scope.season_id  = data.datasportsgroup.competition.season.$.season_id;
                          $scope.season_title  = data.datasportsgroup.competition.season.$.title;
                           $scope.season_title_selected  = data.datasportsgroup.competition.season[0].$.title;
                         }
			

                        $scope.league_name1  = data.datasportsgroup.competition.$.name;
                        $scope.league_id1  = data.datasportsgroup.competition.$.competition_id;
                        $scope.area_name  = data.datasportsgroup.competition.$.area_name;


			
			window.localStorage.setItem('s1_id',$scope.season_id);
                                    season_d=$scope.season_id;			
	                          round();
						
							
			

        }).error(function(data, status, headers, config) {
           
        });

	
   }
else{
	  window.localStorage.setItem('s1_id',season_id);
          $scope.season_id = season_id;
		  season_d=season_id;
	

                              round();
					
}

	
	  function round()
	  {
	
	

          $http({
		  method  : 'POST',
		url  : '/get_rounds',
                data : {"season_id": window.localStorage.getItem('s1_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{
		

			  $scope.xml = data.datasportsgroup.competition.season.rounds;
                          $scope.area_id  = data.datasportsgroup.competition.$.area_id;

                         if((Object.keys($scope.xml)).length > 1){
                           $scope.round_id  = data.datasportsgroup.competition.season.rounds[0].$.round_id;
						   $scope.current_week=data.datasportsgroup.competition.season.rounds[0].$.current_gameweek;
						    window.localStorage.setItem('crnt_wk',$scope.current_week);
						   window.localStorage.setItem('r1_id',$scope.round_id);

                           }else{
		
			 $scope.round_id  = data.datasportsgroup.competition.season.rounds.$.round_id;
			  $scope.current_week=data.datasportsgroup.competition.season.rounds.$.current_gameweek;
			 window.localStorage.setItem('crnt_wk',$scope.current_week);
             window.localStorage.setItem('r1_id',$scope.round_id);			
                         }
			
						mtch();	
                        table();
			

        }).error(function(data, status, headers, config) {
            
        });
				
				
	  }

	function mtch(){

		

	 $http({
			 		            				
                method  : 'POST',
		url  : '/get_matches',
                data : {"type": "round","id": window.localStorage.getItem('r1_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{
	





			
			 $scope.matches = data.datasportsgroup.competition.season.rounds.match;

			  if( $scope.matches == undefined)
		   {
	          window.location.href='./error_page.html';
	       }
		     var al = Object.keys($scope.matches).length;
			
			
			   at=[];
							   sk={}
							   var l =$scope.matches[al-1].$.gameweek;
						
							   for(i=0;i<l;i++)
							   {
								   at[i]=i+1;
								   sk[i]=at[i];
							   }
							   $scope.gameweek=sk;
							
							
				var arr11 = Object.keys($scope.gameweek).map(function(k) { return $scope.gameweek[k] });
			
			
			
             $scope.len11 = arr11.length;
		

					  if($(window).width() < 765) { 
						
			   $scope.currentPage11 = 0;
               $scope.pageSize11 = 3;
               $scope.totalPages11 = 0;
               $scope.pagedData11 = [];
               $scope.kk = $scope.len11 -  $scope.pageSize11;			  
		 
		$scope.paginate11 = function(nextPrevMultiplier11) {
    	$scope.currentPage11 += (nextPrevMultiplier11 * 1);
    	$scope.pagedData11 = arr11.slice($scope.currentPage11);
	  if(nextPrevMultiplier11==1)
						   {
							    $scope.kk = $scope.kk - 1;
								
								
						   }
						    if(nextPrevMultiplier11==-1)
						   {
							    $scope.kk = $scope.kk + 1;
								
								
						   }
		
     }
	 
	 var sk_t = window.localStorage.getItem('crnt_wk');
	
		var wks;
		 wks= window.localStorage.getItem('crnt_wk');
	
	
	
                                  setInterval(function(){
                         		  if($("li").hasClass('active'))
				                  {
					             
				                  }	
                                   else{
				
									      $("ul").find("[myid='" + wks +"']").addClass('active');
								       }								
							      }, 3000);
	

	$scope.get_week=function(wk)
	{
    	wks=wk;
	
     $("ul").find("[myid='" + wk +"']").addClass('active');
	
				
				
     if($("li").hasClass('active'))
	{  $("li").removeClass('active');
       $("ul").find("[myid='" + wk +"']").addClass('active');
	
	}
	 get_match(wks);
		
	}	
			
 function init11() {
	   $('#loader_outer').hide();
	    $scope.totalPages11 = Math.ceil($scope.len11/$scope.pageSize11);
	    $scope.pagedData11 = arr11;

		if(sk_t > 2)
		{
              for(var i=0 ; i<(sk_t - 2); i++)
              {	
                  $scope.paginate11(1);
              }
			
		}
		
		$scope.show_logo = 'true';
		$('#loader_outer1').show();
		
	
 $scope.get_week(wks);
    }

    init11();
	 
	 
	 
	 
	 
	
               }  else{
				   
	           $scope.currentPage11 = 0;
               $scope.pageSize11 = 9;
               $scope.totalPages11 = 0;
               $scope.pagedData11 = [];
              $scope.kk = $scope.len11 -  $scope.pageSize11;
			

    $scope.paginate11 = function(nextPrevMultiplier11) {
    	$scope.currentPage11 += (nextPrevMultiplier11 * 1);
    	$scope.pagedData11 = arr11.slice($scope.currentPage11);
	  if(nextPrevMultiplier11==1)
						   {
							    $scope.kk = $scope.kk - 1;
								
								
						   }
						    if(nextPrevMultiplier11==-1)
						   {
							    $scope.kk = $scope.kk + 1;
								
								
						   }
		
    }
	var sk_t = window.localStorage.getItem('crnt_wk');
	
		var wks;
		 wks= window.localStorage.getItem('crnt_wk');
	
	
	
                                  setInterval(function(){
                         		  if($("li").hasClass('active'))
				                  {
					             
				                  }	
                                   else{
				
									      $("ul").find("[myid='" + wks +"']").addClass('active');
								       }								
							      }, 3000);
	

	$scope.get_week=function(wk)
	{
    	wks=wk;
	
     $("ul").find("[myid='" + wk +"']").addClass('active');
	
				
				
     if($("li").hasClass('active'))
	{  $("li").removeClass('active');
       $("ul").find("[myid='" + wk +"']").addClass('active');
	
	}
	 get_match(wks);
		
	}	
			
 function init11() {
	   $('#loader_outer').hide();
	    $scope.totalPages11 = Math.ceil($scope.len11/$scope.pageSize11);
	    $scope.pagedData11 = arr11;

		if(sk_t > 4)
		{
              for(var i=0 ; i<(sk_t - 5); i++)
              {	
                  $scope.paginate11(1);
              }
			
		}
		
		$scope.show_logo = 'true';
		$('#loader_outer1').show();
		
	
 $scope.get_week(wks);
    }

    init11();			

			   }

	function get_match(wks)
{

  $('#loader_outer').hide();

    arma=[];
	 $scope.mat = data.datasportsgroup.competition.season.rounds.match;

   Object.keys($scope.mat).forEach(function (key)
			{
	
							 if(($scope.mat[key].$.gameweek==wks))
							 {
			                    	       	
                              arma.push($scope.mat[key].$);								
							 }
						
			});
			
			$('#loader_outer').hide();
			
           $scope.show_logo = 'false';	
           $('#loader_outer1').hide();
			
	$scope.me=arma;	

					
						
			play_rank();				
							
}						
	window.setInterval(function(){

		   var twk=window.localStorage.getItem('crnt_wk');
		

		   if($("ul").find("[myid='" + twk +"']").hasClass('active'))
		   {
	          get_match(twk);
	       }

              }, 60000);								
		 					
	

		


							
		
        }).error(function(data, status, headers, config) {
            
        }); 		
	
		
	}	
		
		
		
				  		
		

		
	function table()			
     {				

		 
		
		
		$scope.match_info_tot=function()
		{
			

		         $http({

          method  : 'POST',
		url  : '/get_tables',
                 data : {"type": "round","id": window.localStorage.getItem('r1_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
                          },
			
        }).success(function(data, status, headers, config)
		{
			
	
             $scope.t1= data.datasportsgroup.competition.season.rounds;
	         $scope.season_id=data.datasportsgroup.competition.season.$.season_id;
				
			 $scope.total_table = data.datasportsgroup.competition.season.rounds.total.table;
			
			val = $scope.total_table;
				 $scope.team_array = [];
				 $scope.match_info1 = [];
				
				  Object.keys(val).forEach(function (key)
			  {
				    var array1 = [];
					var t_id = val[key].$.team_id;
					$scope.team_array.push(val[key].$.team_id);
					if(val[key].$.team_id)
			 {
			                $http({
            	       method  : 'POST',
	                	url  : '/get_team',
                       data : {"team": t_id, "limit":"50"},
                       headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
                          },


        }).success(function(data, status, headers, config)
		{
			
			$scope.last_match = data.datasportsgroup.team.last_matches.match;
		
			
				  Object.keys($scope.last_match).forEach(function (key2)
			{
			      var iterator = (((Object.keys($scope.last_match)).length))-(parseInt(key2));
			       if(array1.length >= 0 && array1.length <= 4  ){
					
			         if($scope.last_match[(parseInt(iterator))-1].$.season_id == $scope.season_id)
					 {
							 array1.push($scope.last_match[((parseInt(iterator))-1)]);
					
					 }
				   }
			
			});

			
			 $scope.match_info1[key] = array1;
			

             }).error(function(data, status, headers, config) {
           
        });
		
 }
		
			});
           

		
        }).error(function(data, status, headers, config) {
            
        });
		
		
	}		
	

$scope.match_info_hom=function()
{



      $http({

          method  : 'POST',
		url  : '/get_tables',
                 data : {"type": "round","id": window.localStorage.getItem('r1_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
                          },
			
        }).success(function(data, status, headers, config)
		{
			
	
             $scope.t1= data.datasportsgroup.competition.season.rounds;
	         $scope.season_id=data.datasportsgroup.competition.season.$.season_id;
				
			
			 $scope.home_table = data.datasportsgroup.competition.season.rounds.home.table;
			
			
					val = $scope.home_table;
				
			 	
				$scope.team_array = [];
			
				$scope.match_info2 = [];
				
				
				  Object.keys(val).forEach(function (key)
			{
				var array2 = [];
					var t_id = val[key].$.team_id;

					$scope.team_array.push(val[key].$.team_id);
				
				
	
					if(val[key].$.team_id)
					{
			                $http({
            	       method  : 'POST',
	                	url  : '/get_team',
                       data : {"team": t_id, "limit":"50"},
                       headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
			
			$scope.last_match = data.datasportsgroup.team.last_matches.match;
			
			
			
			
			
				  Object.keys($scope.last_match).forEach(function (key2)
			{
			      var iterator = (((Object.keys($scope.last_match)).length))-(parseInt(key2));
			       if(array2.length >= 0 && array2.length <= 4  ){
					
			         if($scope.last_match[(parseInt(iterator))-1].$.season_id == $scope.season_id)
					 {
						
						
							
						   if($scope.last_match[(parseInt(iterator))-1].$.team_a_id == t_id){
							
							    array2.push($scope.last_match[((parseInt(iterator))-1)]);
							
						   }
					 }
				   }
			
			});

	
				  $scope.match_info2[key] = array2;
			      Object.keys($scope.match_info2).length;
			
			
             }).error(function(data, status, headers, config) {
            
        });
                     	
							
							 }
	
			});
		
		
        }).error(function(data, status, headers, config) {
           
        });

}



$scope.match_info_away=function()
{
	

	
 $http({

          method  : 'POST',
		url  : '/get_tables',
                 data : {"type": "round","id": window.localStorage.getItem('r1_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
                          },
			
        }).success(function(data, status, headers, config)
		{
			
	
             $scope.t1= data.datasportsgroup.competition.season.rounds;
	         $scope.season_id=data.datasportsgroup.competition.season.$.season_id;
			
			 $scope.away_table = data.datasportsgroup.competition.season.rounds.away.table;
			
			val = $scope.away_table;
			
			 	
				$scope.team_array = [];
			
				$scope.match_info3 = [];
				
				  Object.keys(val).forEach(function (key)
			{
				var array3 = [];
					var t_id = val[key].$.team_id;

					$scope.team_array.push(val[key].$.team_id);
				
	
					if(val[key].$.team_id)
					{
			                $http({
            	       method  : 'POST',
	                	url  : '/get_team',
                       data : {"team": t_id, "limit":"50"},
                       headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

        }).success(function(data, status, headers, config)
		{
			
			$scope.last_match = data.datasportsgroup.team.last_matches.match;
			
			
				  Object.keys($scope.last_match).forEach(function (key2)
			{
			      var iterator = (((Object.keys($scope.last_match)).length))-(parseInt(key2));
			       if(array3.length >= 0 && array3.length <= 4  ){
					
			         if($scope.last_match[(parseInt(iterator))-1].$.season_id == $scope.season_id)
					 {
						
				
						    if($scope.last_match[(parseInt(iterator))-1].$.team_b_id == t_id){
							
							    array3.push($scope.last_match[((parseInt(iterator))-1)]);
						   }
						
					 }
				   }
			
			});

		
				 $scope.match_info3[key] = array3;
			
			
			

             }).error(function(data, status, headers, config) {
           
        });
		

						
							
							 }
	
						
			});
		
		
        }).error(function(data, status, headers, config) {
           
        }); 	
	
}
	

	
		
		
		   $scope.match_info_hom();	
		   $scope.match_info_away();	
		   $scope.match_info_tot();
		
		


	  	
	
	
	


			
			
			
	
	
	
			


		
	
	 }
	 	  $scope.tot_home = function(value) {
          $scope.show_logo3 = 'true';
		  $('#loader_outer3').show();
		

 		if(value == "total"){
			$scope.total = 'true';
                        $scope.home = 'false';
                        $scope.away = 'false';

 $scope.match_info_tot();
  $scope.show_logo3 = 'false';
		  $('#loader_outer3').hide();

		}else if(value == "home"){
			$scope.home = 'true';
                         $scope.away = 'false';
                        $scope.total = 'false';

$scope.match_info_hom();
$scope.show_logo3 = 'false';
		  $('#loader_outer3').hide();

		}else{
                        $scope.total = 'false';
                        $scope.home = 'false';
			$scope.away = 'true';

$scope.match_info_away();
$scope.show_logo3 = 'false';
		  $('#loader_outer3').hide();
		}
		
		

		
		
}


		

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
		if($scope.currentTab == 'three.tpl.html')
		{
		
		
       if(compid != null)
	   {
		

          $http({
			
           method  : 'POST',
		url  : '/get_trophies',
                data : {"comp_id": compid},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
			
			
			$scope.xml = data.datasportsgroup;
			
		
			 $scope.season1  = data.datasportsgroup.competition.season;
			 $scope.winner  = data.datasportsgroup.competition.season.winner;
			
	
			

        }).error(function(data, status, headers, config) {
            
        });
	   }
		
		}


	if($scope.currentTab == 'two.tpl.html')
		{
		
			
		}
		


    }


    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
		
		
		
	$scope.myStyle={'color':'black'}
			
	

	
     $scope.onClickTab1 = function (tab) {
        $scope.currentTab1 = tab.url;
		
		if($scope.currentTab1 == 'sub.two.tpl.html')
		{
	
						
	         $scope.show_logo = 'true';
	  $http({
			  	
            	method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id":season_d,"ev": "assists" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			try{
				$scope.assists = data.datasportsgroup.competition.season.assists.people;
				    var arr2 = Object.keys($scope.assists).map(function(k) { return $scope.assists[k] });
			


			
			
             var len = arr2.length;
		   

	           $scope.currentPage = 0;
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData2 = [];

			   $scope.pageButtonDisabled2 = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
		return $scope.currentPage >= len/$scope.pageSize - 1;
		
		
    }

    $scope.paginate2 = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData2 = arr2.slice($scope.currentPage*$scope.pageSize);
		


	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData2 = arr2;
		 $('#loader_outer').hide();


    }

    init();

			}
			catch(e)
			{
			

			    $scope.show_div1 = false;
				   $scope.show_logo = 'false';
			 $('#loader_outer').hide();

			}
		

       $scope.show_logo = 'false';
			 $('#loader_outer').hide();
			
	
			

        }).error(function(data, status, headers, config) {
           $scope.show_logo = 'false';
        });
	
	
	
							
	
	
	}
	
	
	
if($scope.currentTab1 == 'sub.three.tpl.html')
		{

          $scope.show_logo = 'true';	
	
	  $http({
			  	
            	method  : 'POST',
	     	url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('s1_id'),"ev": "bookings" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			try{
				$scope.bookings = data.datasportsgroup.competition.season.bookings.people;
				
				$scope.get_yellowredcards($scope.bookings);
				$scope.show_logo = 'false';
				$('#loader_outer1').hide();	
				
			}catch(e)
		{
		 $scope.show_div1 = false;
		$scope.show_logo = 'false';
		$('#loader_outer1').hide();	
		
		}
				
			
		
			
	$scope.show_logo = 'false';
	$('#loader_outer1').hide();	
			

        }).error(function(data, status, headers, config) {
           $scope.show_logo = 'false';
			 $('#loader_outer1').hide();
			
        });
		
		
			$scope.get_yellowredcards = function(booking){
	
	

		
			
 $http({
			  		
				
            	 method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('s1_id'),"ev": "yellowredcards" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
	        	
			$scope.yellowredcards = data.datasportsgroup.competition.season.yellowredcards.people;
			

			
			     Object.keys(booking).forEach(function (key1)
				    {
		        Object.keys($scope.yellowredcards).forEach(function (key)
				         {
						     if(key == '$'){
							   	 if($scope.yellowredcards[key].people_id == booking[key1].$.people_id){
								
								    booking[key1].$.red_yellow = $scope.yellowredcards[key].count;
								 }
							 }else{
								 if($scope.yellowredcards[key].$.people_id == booking[key1].$.people_id){
								
								    booking[key1].$.red_yellow = $scope.yellowredcards[key].$.count;
							      }
							      }
							
						   });
						
						
						 });
						
						
                	var arr3 = Object.keys(booking).map(function(k) { return booking[k] });
			
			 $('#loader_outer1').hide();
			 $scope.show_logo = 'false';
			
             var len3 = arr3.length;
		    

	           $scope.currentPage = 0;
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData3 = [];

			   $scope.pageButtonDisabled3 = function(dir) {
				 
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
		return $scope.currentPage >= len3/$scope.pageSize - 1;
		
		
    }

    $scope.paginate3 = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData3 = arr3.slice($scope.currentPage*$scope.pageSize);
		


	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len3/$scope.pageSize);
	    $scope.pagedData3 = arr3;
	  
		 $('#loader_outer1').hide();
    }

    init(); 	
			
			$('#loader_outer1').hide();	
		
        }).error(function(data, status, headers, config) {
           
        }); 	
		
		
	}
	
	
	
	
	 $('#loader_outer1').hide();
	
	}
		
		
		
		
    }
	
	
	
	
	
	
	function play_rank()
	{	
		
		 $scope.show_logo3 = 'true';
		  $('#loader_outer3').show();
		
		  $http({
			  	
            	method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season","id":season_d,"ev": "goals" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			try{	$scope.people = data.datasportsgroup.competition.season.goalscorers.people;


                         var arr1 = Object.keys($scope.people).map(function(k) { return $scope.people[k] });
			
			
			
             var len = arr1.length;
		    

	           $scope.currentPage = 0;
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
		return $scope.currentPage >= len/$scope.pageSize - 1;
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);
		

	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr1;
		

    }

    init(); }
	catch(e)
	{
		 
		$scope.show_div1 = false;
		$scope.show_logo = 'false';
		$('#loader_outer').hide();	
		 $scope.show_logo3 = 'false';
		  $('#loader_outer3').hide();
	}
		




			
			 $scope.show_logo3 = 'false';
		  $('#loader_outer3').hide();
			
	
			

        }).error(function(data, status, headers, config) {
            
        });

	
	
	}




	

			
  $http({
			
          method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": window.localStorage.getItem('compi_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
			
			
		    $scope.current_sea_title = data.datasportsgroup.competition.season[0].$.title;
             $scope.current_season_id = data.datasportsgroup.competition.season[0].$.season_id;			
			 $scope.season = data.datasportsgroup.competition.season;

		

			
		
        }).error(function(data, status, headers, config) {
            
        }); 	

		
		
		
		

	   $http({
		
	
           method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id":window.localStorage.getItem('compi_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
			
			 $scope.current_season  = data.datasportsgroup.competition.season[0].$.title;
			  $scope.current_season_id = data.datasportsgroup.competition.season[0].$.season_id;
		
		
			
		
			

        }).error(function(data, status, headers, config) {
            
        });




		



}

  $scope.league_fun($scope.comp_id , $scope.season_id );

$scope.history=function(sean)
	{  
		$scope.show_logo = 'true';
		
		
		 $scope.league_fun(window.localStorage.getItem('compi_id'), sean);
		
	  
		
	}

	
	
 $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		

		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };	
	
	
   




	  $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			
			
			
		
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               var arr_dcl=[];						
			
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id== $scope.cnt_id)
							 {
					         arr_dcl.push($scope.comp[key]);
							 $scope.area_name=$scope.comp[key].$.area_name;
							
							 }
						});
		

						   $scope.compeetts=arr_dcl;
						

						
			

        }).error(function(data, status, headers, config) {
            
        });


		
    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
 
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	

     
	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
		
	
	  if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }

      }

        }).error(function(data, status, headers, config) {
            
        });		
		
		
		
		
		


	
	
	
	
	})



	.controller('saudi_dataCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window) {



		
	
		
		
		$scope.tabs = [{
            title: 'Overview',
            url: 'one.tpl.html'
        }, {
            title: 'League Tables',
            url: 'two.tpl.html'
        },
        {
            title: 'History',
            url: 'three.tpl.html'
        }];
		
		
		
		 $scope.array = ["total","home","away"];
		  $scope.array_first = "total";
		
		  $scope.total = 'true';
                  $scope.home = 'false';
                  $scope.away = 'false';
				
			

        $scope.tabs1 = [{
            title: 'Topscorers',
            url: 'sub.one.tpl.html'
        }, {
            title: 'Assists',
            url: 'sub.two.tpl.html'
        },
		{
            title: 'Bookings',
            url: 'sub.three.tpl.html'
        }];
		
		
		
		
		
		
		  $scope.currentTab1 = 'sub.one.tpl.html';



    $scope.isActiveTab1 = function(tabUrl1) {
        return tabUrl1 == $scope.currentTab1;
		
		
    }







	
				
	


          $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": 27},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		
			$scope.season_id  = data.datasportsgroup.competition.season.$.season_id;
			
			window.localStorage.setItem('s_id',$scope.season_id);			
	
			

        }).error(function(data, status, headers, config) {
            
        });

	
	
	
	
	
	$scope.round_id='';

	
          $http({
		  method  : 'POST',
		url  : '/get_rounds',
                data : {"season_id": window.localStorage.getItem('s_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{
		

			
		
			 $scope.round_id  = data.datasportsgroup.competition.season.rounds.$.round_id;
			
			window.localStorage.setItem('r_id',$scope.round_id);				
	
			

        }).error(function(data, status, headers, config) {
           
        });
				
				
				
			
				
				
				
 $http({
			
          method  : 'POST',
		url  : '/get_tables',
                 data : {"type": "round","id": window.localStorage.getItem('r_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{
	


			
			
		
			 $scope.total_table = data.datasportsgroup.competition.season.rounds.total.table;
			 $scope.home_table = data.datasportsgroup.competition.season.rounds.home.table;
			 $scope.away_table = data.datasportsgroup.competition.season.rounds.away.table;
			
			
	
			

        }).error(function(data, status, headers, config) {
           
        });

		
		
		
		  $scope.tot_home = function(value) { 

		if(value == "total"){
			$scope.total = 'true';
                        $scope.home = 'false';
                        $scope.away = 'false';



		}else if(value == "home"){
			$scope.home = 'true';
                         $scope.away = 'false';
                        $scope.total = 'false';



		}else{
                        $scope.total = 'false';
                        $scope.home = 'false';
			$scope.away = 'true';


		}
		
		
		
		
		
}
		
		
		
		
		
		
		  $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
		if($scope.currentTab == 'three.tpl.html')
		{ 
		
		

          $http({
			
           method  : 'POST',
		url  : '/get_trophies',
                data : {"comp_id": 27},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
			

			
			$scope.xml = data.datasportsgroup;
			
		
			 $scope.season  = data.datasportsgroup.competition.season;
			 $scope.winner  = data.datasportsgroup.competition.season.winner;
			

			
	
			

        }).error(function(data, status, headers, config) {
            
        });

	
	
	$scope.selectDate = function(dt) {
       

      }
	

	
	
	

			
		}


	if($scope.currentTab == 'two.tpl.html')
		{
		
	
	

	
	
	

			
		}
		


    }


    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
		
		
		
	$scope.myStyle={'color':'black'}
			
	

	
	
	
	
	 $scope.onClickTab1 = function (tab) {
        $scope.currentTab1 = tab.url;
		
		if($scope.currentTab1 == 'sub.two.tpl.html')
		{
	
	  $http({
			  	
            	method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season","id": "11917","ev": "assists" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			
			$scope.assists = data.datasportsgroup.competition.season.assists.people;
			

			
	
			

        }).error(function(data, status, headers, config) {
            
        });
	
	
	
	
	
	
	}
	
	
	
	if($scope.currentTab1 == 'sub.three.tpl.html')
		{
	
	  $http({
			  	
            	method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season","id": "11917","ev": "bookings" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			
			$scope.bookings = data.datasportsgroup.competition.season.bookings.people;
			


			
	
			

        }).error(function(data, status, headers, config) {
            
        });
	
	
	
	
	
	
	}
		
		
		
		
    }

	
	
	
	
		
		
		
		  $http({
			  	
            	method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season",id: window.localStorage.getItem('s_id'),"ev": "goals" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			
			$scope.people = data.datasportsgroup.competition.season.goalscorers.people;
			

			
	
			

        }).error(function(data, status, headers, config) {
            
        });

	
	
	$scope.selectDate = function(dt) {
      

      }
	
	
	
	
	$scope.search_item = function() {
		
   

      }





$scope.xml = '';

          $http({
			
          method  : 'POST',
		url  : '/get_trophies',
                data : {"comp_id": 2},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
			
			
			$scope.xml = data.datasportsgroup;
			
			

			 $scope.season = data.datasportsgroup.competition.season;
			

		
        }).error(function(data, status, headers, config) {
            
        });

	$scope.selectDate = function(dt) {
    

      }
	
	
	
	
	
   


	  $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			
			
			
			
			$scope.comp = data.datasportsgroup.competition;
		
			
			

        }).error(function(data, status, headers, config) {
            
        });



	
	
	
	
	})
		

.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; 
        return input.slice(start);
    }
})


.controller('player_detailsCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window ,social) {
		
	
		


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;

	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
	
		 $scope.people_id = (getParameterByName('p_id'));
                 $scope.comp_id = (getParameterByName('comp_id'));


             $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": $scope.comp_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id  = data.datasportsgroup.competition.season[0].$.season_id;
                            $scope.season_title  = data.datasportsgroup.competition.season[0].$.title;

                           }else{
		
			 $scope.season_id  = data.datasportsgroup.competition.season.$.season_id;
                          $scope.season_title  = data.datasportsgroup.competition.season.$.title;
                         }
			

                        $scope.league_name1  = data.datasportsgroup.competition.$.name;
                        $scope.league_id1  = data.datasportsgroup.competition.$.competition_id;
                        $scope.area_name  = data.datasportsgroup.competition.$.area_name;
                        $scope.area_id1 = data.datasportsgroup.competition.$.area_id;


			
				
	
			

        }).error(function(data, status, headers, config) {
           
        });

	

        $scope.comp_namet=[];
     	$scope.comp_name=[];
	    $scope.compid=[];
	  $http({
              method  : 'POST',
		url  : '/get_peoples',
                data : {"id": $scope.people_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
		
        }).success(function(data, status, headers, config)
		{
			


		
$scope.nam=[];

			
			

			$scope.people = data.datasportsgroup.people;
			$scope.name = data.datasportsgroup.people.$.match_name;
			$scope.f_name = data.datasportsgroup.people.$.first_name;
			$scope.l_name = data.datasportsgroup.people.$.last_name;
			
			$scope.born = data.datasportsgroup.people.$.date_of_birth;
			$scope.place_birth = data.datasportsgroup.people.$.place_of_birth;
			$scope.country_birth = data.datasportsgroup.people.$.country_of_birth;
			$scope.nationality = data.datasportsgroup.people.$.nationality;
			$scope.height = data.datasportsgroup.people.$.height;
			$scope.weight = data.datasportsgroup.people.$.weight;
			$scope.foot = data.datasportsgroup.people.$.foot;
			$scope.position = data.datasportsgroup.people.$.position;
		
	               try{ $scope.current_team=data.datasportsgroup.people.membership[0].$.team_name;}catch(e){

                         $scope.current_team=data.datasportsgroup.people.membership.$.team_name;};
		try{	$scope.team_id=data.datasportsgroup.people.membership[0].$.team_id; }catch(e){
                   $scope.team_id=data.datasportsgroup.people.membership.$.team_id;};
			
		try{	$scope.match_stats=data.datasportsgroup.people.membership[0].season_statistic; }catch(e){
                    $scope.match_stats=data.datasportsgroup.people.membership.season_statistic;};
			$scope.matches1=data.datasportsgroup.people.last_matches.match;
			
			$scope.matches = [];
				   Object.keys($scope.matches1).forEach(function (key)
				         { 
						 if(key == 0){
							 $scope.matches = $scope.matches1;
						 }
						 
						 if(key == '$'){
							 	$scope.matches[0] = $scope.matches1;
						 }

						 });
			
		
			
           
			   Object.keys($scope.matches).forEach(function (key)
				         { 
			
							 
			try{ 
			
				var s_id = $scope.matches[key].$.season_id ;
			}catch(e){var s_id = $scope.matches[key].$.season_id ;}
			
   						
			  $http({
	
          method  : 'POST',
		url  : '/get_rounds',
                data :{"season_id":s_id} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			

			$scope.nam = (data.datasportsgroup.competition.$.name).split(' ',1);
            $scope.comp_name[key] = $scope.nam[0];
			$scope.comp_namet[key]=data.datasportsgroup.competition.$.name;
			$scope.compid[key]=data.datasportsgroup.competition.$.competition_id;
        }).error(function(data, status, headers, config) {
           
        });

			});	
			
			
			 $('#loader_outer').hide();
			
		
        }).error(function(data, status, headers, config) {
            
        });
	
	  		
	
       		     $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
           
        });
		

          }

	  	
  $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
 
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	

   
 

	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
	
	
	  if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            //$window.alert('error is coming');
        });




		
	
	  	
	})


	

.controller('coachCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window ,social) {
		
	


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
		
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
	
		 $scope.people_id = (getParameterByName('p_id'));
		   $scope.comp_id = (getParameterByName('comp_id'));


             $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": $scope.comp_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id  = data.datasportsgroup.competition.season[0].$.season_id;
                            $scope.season_title  = data.datasportsgroup.competition.season[0].$.title;

                           }else{
		
			 $scope.season_id  = data.datasportsgroup.competition.season.$.season_id;
                          $scope.season_title  = data.datasportsgroup.competition.season.$.title;
                         }
			

                        $scope.league_name1  = data.datasportsgroup.competition.$.name;
                        $scope.league_id1  = data.datasportsgroup.competition.$.competition_id;
                        $scope.area_name  = data.datasportsgroup.competition.$.area_name;
                        $scope.area_id1 = data.datasportsgroup.competition.$.area_id;


			
						
	
			

        }).error(function(data, status, headers, config) {
            
        });

	



     		
	
	  $http({
	    method  : 'POST',
		url  : '/get_peoples',
                data : {"id": $scope.people_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

		
        }).success(function(data, status, headers, config)
		{
			


			

			
			

			$scope.people = data.datasportsgroup.people;
			$scope.name = data.datasportsgroup.people.$.match_name;
			$scope.f_name = data.datasportsgroup.people.$.first_name;
			$scope.l_name = data.datasportsgroup.people.$.last_name;
			
			$scope.born = data.datasportsgroup.people.$.date_of_birth;
			$scope.place_birth = data.datasportsgroup.people.$.place_of_birth;
			$scope.country_birth = data.datasportsgroup.people.$.country_of_birth;
			$scope.nationality = data.datasportsgroup.people.$.nationality;
			$scope.height = data.datasportsgroup.people.$.height;
			$scope.weight = data.datasportsgroup.people.$.weight;
			
			
			
			$scope.membership=data.datasportsgroup.people.membership;
				var keys = Object.keys($scope.membership);
             var len = keys.length;
			

			 if(len==1)
			 {
				$scope.role=data.datasportsgroup.people.membership.$.role
			 }
			 else{
				$scope.role=data.datasportsgroup.people.membership[0].$.role;
			 }
			
			
			 if(len>1)
			 {
			$scope.match_stats=data.datasportsgroup.people.membership[len-1].season_statistic;
			$scope.team_id=data.datasportsgroup.people.membership[len-1].$.team_id;
			$scope.team_name=data.datasportsgroup.people.membership[len-1].$.team_name;
			 }else{
				 $scope.match_stats=data.datasportsgroup.people.membership.$.season_statistic;
			$scope.team_id=data.datasportsgroup.people.membership.$.team_id;
			$scope.team_name=data.datasportsgroup.people.membership.$.team_name;
				
			 }
		

			
        }).error(function(data, status, headers, config) {
            
        });
	
	  		       		     $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
            
        });
		

          }
		
	
	   $('#loader_outer').hide();



  $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
  
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	
 
	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
		
	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            
        });




	   
		
	})
	

		



.controller('score_detailsCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window, social) {
		
	 $scope.match_id = (getParameterByName('match_id'));
			  setInterval(function(){
                         		 
					           
								if( $("#loader_outer").css('display') == "block"){
									
																	
									window.location.href='./error_page.html';
									
								}
								   
							      }, 15000);
								  
								  			  setInterval(function(){
												  
												      $http({
		
		  		
            	 method  : 'POST',
		url  : '/get_matches',
                data : {"type": "match","id":$scope.match_id,"detailed":"yes"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
                         		 
					           
									  	$scope.game_minute = data.datasportsgroup.competition.season.rounds.group.match.$.game_minute;
				$scope.status1 = data.datasportsgroup.competition.season.rounds.group.match.$.status;
							
							

			   }).error(function(data, status, headers, config) {
                           
                          });						   
							      }, 60000);
								  
					
								  
								  if ($(window).width() < 765) {
									  
				$scope.zing_width='60%';					  
				$scope.zing_height='175px';
			
				
						$scope.myObj = {
        "margin-left" : "-40px",
        "float" : "left"
    }
				
			
					
				
				

}else{
			$scope.zing_width='112%';					  
				$scope.zing_height='350px';
			
				
					$scope.myObj = {
        "margin" : "0px !important"
       
    }	
				
				
	
}
								  
								  
		

$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
	

	 $scope.score=(getParameterByName('sco'));
	

	
		$scope.tabs = [{
            title: 'Summary',
            url: 'one.tpl.html'
        }, {
            title: 'Formation',
            url: 'two.tpl.html'
        },
        {
            title: 'Head-To-Head',
            url: 'three.tpl.html'
        }];
	

 $http({
            	             method  : 'POST',
		url  : '/get_head2head',
                data : {"id": $scope.match_id },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
                              }).success(function(data, status, headers, config)
	                     	{
			

			$scope.ar=data.datasportsgroup.head2head_matches.match;
			

			var test,test1;
			var sm1a,sm1b,sm2a,sm2b,agre,agre1;
			$scope.s_mat;
			 Object.keys($scope.ar).forEach(function (key)
				{
					
					if(key == '$'){
						
						
						
					}else{
				
                        if( $scope.ar[key].$.match_id ==  $scope.match_id)
						{
					      $scope.s_mat = $scope.ar[key].$;
                           test=1;
                           sm1a= $scope.ar[key].$.score_a;	
                           sm1b= $scope.ar[key].$.score_b;

						
						}
                         if( ($scope.ar[key].$.match_id == ( parseInt($scope.match_id)-1)) || ((parseInt($scope.ar[key].$.match_id)) == ( parseInt($scope.match_id)-8)) || ((parseInt($scope.ar[key].$.match_id)) == ( parseInt($scope.match_id)-7)))
						{
						
                           test1=2;
                           sm2a= $scope.ar[key].$.score_a;	
                           sm2b= $scope.ar[key].$.score_b;

						
						}	
                      if( ($scope.ar[key].$.match_id == (parseInt($scope.match_id)+1))||((parseInt($scope.ar[key].$.match_id)) == ( parseInt($scope.match_id))+8) ||((parseInt($scope.ar[key].$.match_id)) == ( parseInt($scope.match_id))+7))
						{
						
                           test1=3;
                           sm2a= $scope.ar[key].$.score_a;	
                           sm2b= $scope.ar[key].$.score_b;	

						
						}
					}						
				});
				
				
			

				 $scope.bg;
			if((test == 1) && (test1 == 2))
			{
				

				if(sm1a == '' && sm1b == '')
				{
					  agre = (parseInt(sm2b))+' - '+(parseInt(sm2a));
					  if(parseInt(sm2b) > parseInt(sm2a))
					    { $scope.bg = 1;}
                        else{
							$scope.bg=2;
							agre1=(parseInt(sm2a))+' - '+(parseInt(sm2b));
						    }					
				}
				else if(sm2a == '' && sm2b == '')
			    {
					  agre = (parseInt(sm1a))+' - '+(parseInt(sm1b));
			              if(parseInt(sm1a) > parseInt(sm1b))
					    { $scope.bg = 1;}
                        else{
							$scope.bg=2;
								agre1=(parseInt(sm1b))+' - '+(parseInt(sm1a));
						    }			
				}
				else{
			     agre = (parseInt(sm1a) + parseInt(sm2b))+' - '+(parseInt(sm1b) + parseInt(sm2a));
				    if((parseInt(sm1a) + parseInt(sm2b)) > (parseInt(sm1b) + parseInt(sm2a)))
					    { $scope.bg = 1;}
                        else{
							$scope.bg=2;
							agre1=(parseInt(sm1b) + parseInt(sm2a))+' - '+(parseInt(sm1a) + parseInt(sm2b));
						    }	
				}
			}	
				if((test == 1) && (test1 == 3))
			{
			

				if(sm1a == '' && sm1b == '')
				{
					  agre = (parseInt(sm2b))+' - '+(parseInt(sm2a));
					   if(parseInt(sm2b) > parseInt(sm2a))
					    { $scope.bg = 1;}
                        else{
							$scope.bg=2;
							agre1=(parseInt(sm2a))+' - '+(parseInt(sm2b));
						    }	
				}
				else if(sm2a == '' && sm2b == '')
			    {
					  agre = (parseInt(sm1a))+' - '+(parseInt(sm1b));
					   if(parseInt(sm1a) > parseInt(sm1b))
					    { $scope.bg = 1;}
                        else{
							$scope.bg=2;
                       agre1=(parseInt(sm1b))+' - '+(parseInt(sm1a));							
						    }	
				}
				else{
			     agre = (parseInt(sm1a) + parseInt(sm2b))+' - '+(parseInt(sm1b) + parseInt(sm2a));
				    if((parseInt(sm1a) + parseInt(sm2b)) > (parseInt(sm1b) + parseInt(sm2a)))
					    { $scope.bg = 1;}
                        else{
							$scope.bg=2;
							 agre1=(parseInt(sm1b) + parseInt(sm2a))+' - '+(parseInt(sm1a) + parseInt(sm2b));
						    }	
				}
				
				
			}	
			
		
			$scope.aggr=agre;
			$scope.aggr1=agre1;
			$scope.test=($scope.aggr).split('-');
			$scope.t_name;
			if(parseInt($scope.test[0]) == parseInt($scope.test[1]))
			{	
			  $scope.ch=1;
			  
			  if($scope.s_mat.score_a > $scope.s_mat.score_b)
			  {
				$scope.t_name=$scope.s_mat.team_a_name;  
			  }
			  else if($scope.s_mat.score_b > $scope.s_mat.score_a)
			  {
				 $scope.t_name=$scope.s_mat.team_b_name; 
			  }
			}else if(parseInt($scope.test[0]) != parseInt($scope.test[1])){
				$scope.ch=0;
				
			}
			
			
			
		
			
			

                             }).error(function(data, status, headers, config) {
                            
                          });




	
	
	



	
		
   $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		

		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };
		
		
		
		
		  $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
		if($scope.currentTab == 'three.tpl.html')
		{
	
	       $scope.comps_name2 = [];
		   $scope.comps_id2 = [];
		
		            	 $http({
            	             method  : 'POST',
		url  : '/get_head2head',
                data : {"id": $scope.match_id },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
                              }).success(function(data, status, headers, config)
	                     	{
			

			
			
			
		
			
			

			                   $scope.head2head_matche = data.datasportsgroup.head2head_matches.match;
			
							   $scope.make_comps5 = function(){
					Object.keys($scope.head2head_matche).forEach(function (key9) {
			

				
					try{
				
					var sea_id = $scope.head2head_matche[key9].$.season_id;
					
					
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{

        
				$scope.comps_name2[key9]= data.datasportsgroup.competition.$.name;
			$scope.comps_id2[key9]= data.datasportsgroup.competition.$.competition_id;
				
				
		
				}catch(e){
				};

		

        }).error(function(data, status, headers, config) {
           
        });
	  			

         }catch(e){
		 };
				
				
				});
				
					}
					
					
					
			
				

            var arr = Object.keys($scope.head2head_matche).map(function(k) { return $scope.head2head_matche[k] });
			

			
			
             var len = arr.length;
		    

	           $scope.currentPage = 0;
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
		return $scope.currentPage >= len/$scope.pageSize - 1;
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr.slice($scope.currentPage*$scope.pageSize);
		

	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr;
		

    }

    init();




			                     $scope.team_1_win=data.datasportsgroup.head2head.team_1_total.$.wins;
							   $scope.team_2_win=data.datasportsgroup.head2head.team_2_total.$.wins;
							   $scope.total_matches=data.datasportsgroup.head2head.team_1_total.$.matches;
							   $scope.draws=data.datasportsgroup.head2head.team_1_total.$.draws;
                               $scope.team_1_name=data.datasportsgroup.head2head.$.team_1_name;
                               $scope.team_2_name=data.datasportsgroup.head2head.$.team_2_name;								
								
								window.localStorage.setItem('team_a_w',$scope.team_1_win);
								window.localStorage.setItem('team_b_w',$scope.team_2_win);
								window.localStorage.setItem('draw',$scope.draws);
							
			                   
	                          var  a=parseInt(window.localStorage.getItem('team_a_w'));
							  var  b=parseInt(window.localStorage.getItem('team_b_w'));
							  var  c=parseInt(window.localStorage.getItem('draw'));
			
								




 $scope.myJson = {
        globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
        type: "pie",
        backgroundColor: "#fff",

        legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
        tooltip: {
            text: ""
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
                placement: "in",
                text: "%npv %",
                fontSize: "15px",
                textAlpha: 1,
            }
        },
        series: [{
	         text: "Win " +$scope.team_1_name ,
            values: [a],
            backgroundColor: "#FA6E6E #FA9494",
        }, {
            text: "Win " +$scope.team_2_name ,
            values: [b] ,
            backgroundColor: "#28C2D1",
        }, {
            text: "Matches draws",
            values: [c],
            backgroundColor: "#D2D6DE"
        }]
    };
			

                             }).error(function(data, status, headers, config) {
                           
                          });

	
	
	              $scope.selectDate = function(dt) {
           

              }	
	
			
		}
		  else if($scope.currentTab == 'two.tpl.html'){
		

		
		  }
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
		
		
    }
		
		
	
		
	$scope.myStyle={'color':'black'}	
	
	
	


	
	$scope.change_tabs = function(val){
		
		if(val == 'a'){
			$('.name2').removeClass("active");
			$('.name1').addClass("active");
			
			$('.resp_lineup2').removeClass("visible");
			$('.resp_lineup1').addClass("visible");
			$('.resp_lineup4').removeClass("visible");
			$('.resp_lineup3').addClass("visible");
			$('.resp_lineup6').removeClass("visible");
			$('.resp_lineup5').addClass("visible");
	
			
			
		}else{
			$('.name1').removeClass("active");
			$('.name2').addClass("active");
			
				$('.resp_lineup1').removeClass("visible");
			    $('.resp_lineup2').addClass("visible");
				$('.resp_lineup3').removeClass("visible");
		     	$('.resp_lineup4').addClass("visible");
			    $('.resp_lineup5').removeClass("visible");
			    $('.resp_lineup6').addClass("visible");
		
			
		}
	};
	
		$scope.change_tabs1 = function(val){
		
		if(val == 'a'){
			$('.resp_name2').removeClass("active");
			$('.resp_name1').addClass("active");
			
			$('.resp_play1').removeClass("visible");
			$('.resp_play').addClass("visible");
			
			
		}else{
			$('.resp_name1').removeClass("active");
			$('.resp_name2').addClass("active");
			
				$('.resp_play').removeClass("visible");
			    $('.resp_play1').addClass("visible");
			
		}
	};
	
	

	
			
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
		
		
		 $scope.f_id = (getParameterByName('f_id'));
		  $scope.s_id = (getParameterByName('s_id'));
          $scope.c_name = (getParameterByName('cid'));
		
		  var venue_id='';
		  	var arr_req= [];
			
		
	$scope.get_first_match = function(first_id, loc_val, com_id){
		
			$scope.show_logo = 'true';
		  $('#loader_outer3').show();
		
		$scope.loc_val = loc_val;
		
	  $http({
            	method  : 'POST',
		url  : '/get_team',
                data : {"team": first_id, "limit":"45"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
			
			$scope.comps_name= [];
			$scope.comps_id= [];
			var all_comps=[];
			var all_comps1=[];
			
			var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
			$scope.day = ('0' + date.getDate()).slice(-2);
			
			var arr = [];
			
			
			
			
			
			
			
			$scope.required_seasons1 = function(id){
				
				$scope.last_match1 = data.datasportsgroup.team.last_matches.match;
			    $scope.next_match = data.datasportsgroup.team.next_matches.match;
				
			 $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml2 = data.datasportsgroup.competition.season ;
				
				
					Object.keys($scope.last_match1).forEach(function (key)
				{
					Object.keys($scope.xml2).forEach(function (key2)
				{
					
					
					if($scope.xml2[key2].$.season_id == $scope.last_match1[key].$.season_id){
						
						all_comps.push($scope.last_match1[key]);
					}
					
				});
					
				});
				
				
						Object.keys($scope.next_match).forEach(function (key)
				{
					Object.keys($scope.xml2).forEach(function (key2)
				{
					
					
					if($scope.xml2[key2].$.season_id == $scope.next_match[key].$.season_id){
						
						all_comps1.push($scope.next_match[key]);
					}
					
				});
					
				});
				
				
				
				
				$scope.last_match1 = all_comps;
				$scope.next_match = all_comps1;
				
			   $scope.get_val1($scope.loc_val);
			



			
					
	
			

        }).error(function(data, status, headers, config) {
           
        });
				
			}
			
				
			if(com_id != 1 && com_id != '' && !isNaN(com_id)){
			  $scope.required_seasons1(com_id);
			
			
			}else{$scope.last_match1 = data.datasportsgroup.team.last_matches.match;
               	$scope.next_match = data.datasportsgroup.team.next_matches.match;
				
					
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match1).forEach(function (key)
				{
				if(key != 0){
					if($scope.last_match1[key].$.team_a_id == first_id){
					arr.push($scope.last_match1[key]);
					}		
				}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match1).forEach(function (key1)
				{
					if(key1 != 0){
					if($scope.last_match1[key1].$.team_b_id == first_id){
					arr.push($scope.last_match1[key1]);
					}	
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match1).forEach(function (key2)
				{
					if(key2 != 0){
					arr.push($scope.last_match1[key2]);
					}			
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match).forEach(function (key)
				{
					if($scope.next_match[key].$.team_a_id == first_id){
					arr.push($scope.next_match[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match).forEach(function (key1)
				{
					if($scope.next_match[key1].$.team_b_id == first_id){
					arr.push($scope.next_match[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match).forEach(function (key2)
				{
					
					arr.push($scope.next_match[key2]);
										
				});
			}
			
			
					    $scope.total_match = arr;
						
				
			$scope.make_comps = function(){
			
			
				Object.keys($scope.total_match).forEach(function (key9) {
			

				
					try{
				
					var sea_id = $scope.total_match[key9].$.season_id;
					
					
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
	            async: false,



        }).success(function(data, status, headers, config)
		{
				try{

         
			$scope.comps_name[key9]= data.datasportsgroup.competition.$.name;
			$scope.comps_id[key9]= data.datasportsgroup.competition.$.competition_id;
				
		
				}catch(e){
				};

		

        }).error(function(data, status, headers, config) {
           
        });
	  			

         }catch(e){
		 };
				
				
				});
				}
				
				
					$scope.show_logo = 'false';
		  $('#loader_outer3').hide();
		
				


              var arr1 = Object.keys($scope.total_match).map(function(k) { return $scope.total_match[k] });
			


			
			
             var len = arr1.length;
		    
            if(loc_val == 'home_away'){$scope.currentPage = 4;}
			if(loc_val == 'home'){$scope.currentPage = 0;}
			if(loc_val == 'away'){$scope.currentPage = 0;}
	
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
             
		return $scope.currentPage >= ((len/$scope.pageSize) - 1);
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);
		


	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);

		


    }

    init();
			
				
  				}
			  	
				
		
				$scope.get_val1 = function(loc_val){
				
				
			
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match1).forEach(function (key)
				{
					if($scope.last_match1[key].$.team_a_id == first_id){
					arr.push($scope.last_match1[key]);
					}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match1).forEach(function (key1)
				{
					if($scope.last_match1[key1].$.team_b_id == first_id){
					arr.push($scope.last_match1[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
				
	
			  Object.keys($scope.last_match1).forEach(function (key2)
				{
					
					arr.push($scope.last_match1[key2]);
										
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match).forEach(function (key)
				{
					if($scope.next_match[key].$.team_a_id == first_id){
					arr.push($scope.next_match[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match).forEach(function (key1)
				{
					if($scope.next_match[key1].$.team_b_id == first_id){
					arr.push($scope.next_match[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match).forEach(function (key2)
				{
					
					arr.push($scope.next_match[key2]);
										
				});
			}
			
			
					    $scope.total_match = arr;
				
			
			   $scope.make_comps1 = function(){
			
				Object.keys($scope.total_match).forEach(function (key)
				{
					
				
					var sea_id = $scope.total_match[key].$.season_id;
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{

         
				$scope.comps_name[key]= data.datasportsgroup.competition.$.name;
			$scope.comps_id[key]= data.datasportsgroup.competition.$.competition_id;
				
		
				}catch(e){};



        }).error(function(data, status, headers, config) {
            
        });
	  			


				
				
				});
				}
				
         
		
		  	$scope.show_logo = 'false';
		  $('#loader_outer3').hide();

              var arr1 = Object.keys($scope.total_match).map(function(k) { return $scope.total_match[k] });
			


			
			
             var len = arr1.length;
		   
            if(loc_val == 'home_away'){$scope.currentPage = 0;}
			if(loc_val == 'home'){$scope.currentPage = 0;}
			if(loc_val == 'away'){$scope.currentPage = 0;}
	
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				 
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
             
		return $scope.currentPage >= ((len/$scope.pageSize) - 1);
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);
		


	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);

		


    }

    init();
			
		
			
				}
			
				try{
					 $scope.name1=data.datasportsgroup.team.$.short_name;
					 if(!$scope.name1){
					 $scope.name1=data.datasportsgroup.team.$.current_team_name;}
			
			$scope.t_id1=data.datasportsgroup.team;
			
			venue_id = data.datasportsgroup.team.team_extra.primary_venue_id;
			
				}catch(e){};
			
		
				
			try{
	
			$scope.team_name = data.datasportsgroup.team.current_team_name;
			$scope.area_id1 = data.datasportsgroup.team.$.area_id;
			
			    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			
			
			
		
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               var arr_dcl=[];	
                          							
			                 arr_dcl.push({name:'All Competition', id:1});
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id == $scope.area_id1)
							 {
					         arr_dcl.push($scope.comp[key]);
							
							
							 }
						});
		

						   $scope.compeetts=arr_dcl;
						
			

        }).error(function(data, status, headers, config) {
            
        });

			
			
			
			
			
			}catch(e){};
			
			try{
			$scope.next_match_vs = data.datasportsgroup.team.next_matches.match[0].date;
			}catch(e){};
		
			
	

		
		
		
		
		
		
		
		
		
		
		
			

        }).error(function(data, status, headers, config) {
           
        });
	  	
	
	}
	
	

	
	$scope.get_first_match($scope.f_id,'home_away',1);
	
	
	
	$scope.get_second_match = function(second_id, loc_val, com_id){
		
			$scope.show_logo4 = 'true';
		  $('#loader_outer1').show();
		
		
	  $http({
		
		  method  : 'POST',
		url  : '/get_team',
                data : {"team": second_id, "limit":"45"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
				

        }).success(function(data, status, headers, config)
		{
		
			$scope.comps_name1= [];
			$scope.comps_id1= [];
			var all_comps3=[];
			var all_comps4=[];
			
			var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
			$scope.day = ('0' + date.getDate()).slice(-2);
			
			
		
			
			
			$scope.xml = data.datasportsgroup.team;
			 $scope.name2=data.datasportsgroup.team.$.short_name;
			 if(!$scope.name2){
			 $scope.name2=data.datasportsgroup.team.$.current_team_name;}
			$scope.t_id2=data.datasportsgroup.team;
			var arr1 = [];
			
			
			
			
			$scope.required_seasons2 = function(id){
				
				$scope.last_match2 = data.datasportsgroup.team.last_matches.match;
			$scope.next_match2 = data.datasportsgroup.team.next_matches.match;
				
			 $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml3 = data.datasportsgroup.competition.season ;
				
				
					Object.keys($scope.last_match2).forEach(function (key)
				{
					Object.keys($scope.xml3).forEach(function (key2)
				{
					
					
					if($scope.xml3[key2].$.season_id == $scope.last_match2[key].$.season_id){
						
						all_comps3.push($scope.last_match2[key]);
					}
					
				});
					
				});
				
				
						Object.keys($scope.next_match2).forEach(function (key)
				{
					Object.keys($scope.xml3).forEach(function (key2)
				{
					
					
					if($scope.xml3[key2].$.season_id == $scope.next_match2[key].$.season_id){
						
						all_comps4.push($scope.next_match2[key]);
					}
					
				});
					
				});
				
				
				
				
				$scope.last_match2 = all_comps3;
				$scope.next_match2 = all_comps4;
				
			   $scope.get_val2();
			



			
					
	
			

        }).error(function(data, status, headers, config) {
           
        });
				
			}
			
			
				if(com_id != 1 && com_id != '' && !isNaN(com_id)){
			  $scope.required_seasons2(com_id);
			
			
			}else{
			
			$scope.last_match2 = data.datasportsgroup.team.last_matches.match;
			$scope.next_match2 = data.datasportsgroup.team.next_matches.match;
			
			if(loc_val == 'home'){
	        Object.keys($scope.last_match2).forEach(function (key)
				{
					if(key != 0){
					if($scope.last_match2[key].$.team_a_id == second_id){
					arr1.push($scope.last_match2[key]);
					}	
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match2).forEach(function (key1)
				{
					if(key1 != 0){
					if($scope.last_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.last_match2[key1]);
					}	
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match2).forEach(function (key2)
				{
					if(key2 != 0){
					arr1.push($scope.last_match2[key2]);
					}					
				});
			}
			
			
			
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match2).forEach(function (key)
				{
					if($scope.next_match2[key].$.team_a_id == second_id){
					arr1.push($scope.next_match2[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match2).forEach(function (key1)
				{
					if($scope.next_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.next_match2[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match2).forEach(function (key2)
				{
					
					arr1.push($scope.next_match2[key2]);
										
				});
			}
			

			$scope.total_match1 = arr1;
		
                   $scope.make_comps2 = function(){
             	Object.keys($scope.total_match1).forEach(function (key)
				{
					try{
					var sea_id1 = $scope.total_match1[key].$.season_id;
					}catch(e){var sea_id1 ='';};
				if(sea_id1){
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id1},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{
        
		$scope.comps_name1[key]= data.datasportsgroup.competition.$.name;
			$scope.comps_id1[key]= data.datasportsgroup.competition.$.competition_id;
				}catch(e){};



        }).error(function(data, status, headers, config) {
            
        });
	  			
				}


				
				});
				   }
				
				
				   	$scope.show_logo4 = 'false';
		  $('#loader_outer1').hide();

             var arr2 = Object.keys($scope.total_match1).map(function(k) { return $scope.total_match1[k] });
			


			
			
             var len = arr2.length;
		   

	            if(loc_val == 'home_away'){$scope.currentPage1 = 4;}
			if(loc_val == 'home'){$scope.currentPage1 = 0;}
			if(loc_val == 'away'){$scope.currentPage1 = 0;}
               $scope.pageSize1 = 10;
               $scope.totalPages1 = 0;
               $scope.pagedData3 = [];

			   $scope.pageButtonDisabled1 = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage1 == 0;
    	}
		return $scope.currentPage1 >= ((len/$scope.pageSize1) - 1);
		
		
    }

    $scope.paginate1 = function(nextPrevMultiplier) {
    	$scope.currentPage1 += (nextPrevMultiplier * 1);
    	$scope.pagedData3 = arr2.slice($scope.currentPage1*$scope.pageSize1);
		


	
    }

    function init() {
	    $scope.totalPages1 = Math.ceil(len/$scope.pageSize1);
	    $scope.pagedData3 = arr2.slice($scope.currentPage1*$scope.pageSize1);
		


    }

    init();

			}	
			
			
					
				$scope.get_val2 = function(){
					
					
				
				
			
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match2).forEach(function (key)
				{
					if($scope.last_match2[key].$.team_a_id == second_id){
					arr1.push($scope.last_match2[key]);
					}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match2).forEach(function (key1)
				{
					if($scope.last_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.last_match2[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match2).forEach(function (key2)
				{
					
					arr1.push($scope.last_match2[key2]);
										
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match2).forEach(function (key)
				{
					if($scope.next_match2[key].$.team_a_id == second_id){
					arr1.push($scope.next_match2[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match2).forEach(function (key1)
				{
					if($scope.next_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.next_match2[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match2).forEach(function (key2)
				{
					
					arr1.push($scope.next_match2[key2]);
										
				});
			}
			
			
					    $scope.total_match1 = arr1;
						
				
			
			   $scope.make_comps3 = function(){
			
				Object.keys($scope.total_match1).forEach(function (key)
				{
					
				
					var sea_id1 = $scope.total_match1[key].$.season_id;
					
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id1},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{

        
			$scope.comps_name1[key]= data.datasportsgroup.competition.$.name;
			$scope.comps_id1[key]= data.datasportsgroup.competition.$.competition_id;	
				
		
				}catch(e){};



        }).error(function(data, status, headers, config) {
          
        });
	  			


				
				
				});
				
			   }
			 
			
			   	$scope.show_logo4 = 'false';
		  $('#loader_outer1').hide();

              var arr2 = Object.keys($scope.total_match1).map(function(k) { return $scope.total_match1[k] });
			

			
			
             var len = arr2.length;
		   
            if(loc_val == 'home_away'){$scope.currentPage1 = 0;}
			if(loc_val == 'home'){$scope.currentPage1 = 0;}
			if(loc_val == 'away'){$scope.currentPage1 = 0;}
	
               $scope.pageSize1 = 10;
               $scope.totalPages1 = 0;
               $scope.pagedData3 = [];

			   $scope.pageButtonDisabled1 = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage1 == 0;
    	}
             
		return $scope.currentPage1 >= ((len/$scope.pageSize1) - 1);
		
		
    }

    $scope.paginate1 = function(nextPrevMultiplier) {
    	$scope.currentPage1 += (nextPrevMultiplier * 1);
    	$scope.pagedData3 = arr2.slice($scope.currentPage1*$scope.pageSize1);
		


	
    }

    function init() {
	    $scope.totalPages1 = Math.ceil(len/$scope.pageSize1);
	    $scope.pagedData3 = arr2.slice($scope.currentPage1*$scope.pageSize1);

		


    }

    init();
			
		
			
				}
			
			
			try{
			$scope.team_name = data.datasportsgroup.team.current_team_name;
			}catch(e){};
			try{
			$scope.next_match_vs = data.datasportsgroup.team.next_matches.match[0].date;
			$scope.area_id2 = data.datasportsgroup.team.$.area_id;
			
			    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			
			
			
		
			

			                   $scope.comp = data.datasportsgroup.competition;

                               var arr_dcl1=[];	
                          							
			                 arr_dcl1.push({name:'All Competition', id:1});
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id == $scope.area_id2)
							 {
					         arr_dcl1.push($scope.comp[key]);
							
							
							 }
						});
		

						   $scope.compeetts1=arr_dcl1;
						
			

        }).error(function(data, status, headers, config) {
           
        });

			}catch(e){};
		
			
	
			

        }).error(function(data, status, headers, config) {
           
        });
		
	}
	
	
	$scope.get_second_match($scope.s_id,'home_away',1);
	
	
	
	$scope.change_home = function(id1, id2){
	
		
		           if(id1 == 1 || id1 == 'Home & Away'){$scope.get_first_match($scope.f_id,'home_away',id2);
				
			
		            }else if(id1 == '2'){
			            $scope.get_first_match($scope.f_id,'home',id2);
		                }else{$scope.get_first_match($scope.f_id,'away',id2);
		                }
		
	             }
				
	$scope.change_home1 = function(id, id2){
		
		           if(id == 1 || id == 'Home & Away'){$scope.get_second_match($scope.s_id,'home_away',id2);
		            }else if(id == 2){
			            $scope.get_second_match($scope.s_id,'home',id2);
		                }else{$scope.get_second_match($scope.s_id,'away',id2);
		                }
		
	             }	
		
		
		     $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
            
        });
		

          }
		
		
		
		
		
	
  


         var array = [];
          var array_s = [];
           var conversion = [];
          var items = [];
          var goal_count = 0;


          $scope.score_team_a = 0;
          $scope.score_team_b = 0;

        $scope.team_sco_a = [];
        $scope.team_sco_b = [];
        $scope.f_table = [];

        $scope.linup_g_keeper=[];
        $scope.linup_midfielder=[];
        $scope.linup_defender=[];
        $scope.linup_attacker=[];
       $scope.linup_final = [];


         $http({
		
		  		
            	 method  : 'POST',
		url  : '/get_matches',
                data : {"type": "match","id":$scope.match_id,"detailed":"yes"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
			
			
		    try{
			
			
			$scope.league_name1 = data.datasportsgroup.competition.$.name;
			$scope.comp_id1 = data.datasportsgroup.competition.$.competition_id;
			window.localStorage.setItem("comp_id1",$scope.comp_id1);
			
                        $scope.area_name1 = data.datasportsgroup.competition.$.area_name;
                         $scope.area_id1 = data.datasportsgroup.competition.$.area_id;
                         $scope.season_title1 = data.datasportsgroup.competition.season.$.title;
						
				$scope.score_a1 = data.datasportsgroup.competition.season.rounds.match.$.score_a;		
			 $scope.score_b1 = data.datasportsgroup.competition.season.rounds.match.$.score_b;
						
			$scope.main_referee = data.datasportsgroup.competition.season.rounds.match.referees.main_referee.$.matchname;
			$scope.main_referee_n = data.datasportsgroup.competition.season.rounds.match.referees.main_referee.$.nationality;
			
			$scope.assistant_n1 = data.datasportsgroup.competition.season.rounds.match.referees.assistant_n1.$.matchname;
			$scope.assistant_n1_n = data.datasportsgroup.competition.season.rounds.match.referees.assistant_n1.$.nationality;
			
			$scope.assistant_n2 = data.datasportsgroup.competition.season.rounds.match.referees.assistant_n2.$.matchname;
			$scope.assistant_n2_n = data.datasportsgroup.competition.season.rounds.match.referees.assistant_n2.$.nationality;
			
			$scope.fourth_official = data.datasportsgroup.competition.season.rounds.match.referees.fourth_official.$.matchname;
			$scope.fourth_official_n = data.datasportsgroup.competition.season.rounds.match.referees.fourth_official.$.nationality;
			
                        }catch(e){
							
							try{
							
					$scope.score_a1 = data.datasportsgroup.competition.season.rounds.group.match.$.score_a;		
			 $scope.score_b1 = data.datasportsgroup.competition.season.rounds.group.match.$.score_b;
							
							$scope.main_referee = data.datasportsgroup.competition.season.rounds.group.match.referees.main_referee.$.matchname;
			$scope.main_referee_n = data.datasportsgroup.competition.season.rounds.group.match.referees.main_referee.$.nationality;
			$scope.assistant_n1 = data.datasportsgroup.competition.season.rounds.group.match.referees.assistant_n1.$.matchname;
			$scope.assistant_n1_n = data.datasportsgroup.competition.season.rounds.group.match.referees.assistant_n1.$.nationality;
			$scope.assistant_n2 = data.datasportsgroup.competition.season.rounds.group.match.referees.assistant_n2.$.matchname;
			$scope.assistant_n2_n = data.datasportsgroup.competition.season.rounds.group.match.referees.assistant_n2.$.nationality;
			$scope.fourth_official = data.datasportsgroup.competition.season.rounds.group.match.referees.fourth_official.$.matchname;
			$scope.fourth_official_n = data.datasportsgroup.competition.season.rounds.group.match.referees.fourth_official.$.nationality;
			
			
							}catch(e){
								try{
									$scope.score_a1 = data.datasportsgroup.competition.season.rounds.playoff.match.$.score_a;		
			 $scope.score_b1 = data.datasportsgroup.competition.season.rounds.playoff.match.$.score_b;
								
									$scope.main_referee = data.datasportsgroup.competition.season.rounds.playoff.match.referees.main_referee.$.matchname;
			$scope.main_referee_n = data.datasportsgroup.competition.season.rounds.playoff.match.referees.main_referee.$.nationality;
			$scope.assistant_n1 = data.datasportsgroup.competition.season.rounds.playoff.match.referees.assistant_n1.$.matchname;
			$scope.assistant_n1_n = data.datasportsgroup.competition.season.rounds.playoff.match.referees.assistant_n1.$.nationality;
			$scope.assistant_n2 = data.datasportsgroup.competition.season.rounds.playoff.match.referees.assistant_n2.$.matchname;
			$scope.assistant_n2_n = data.datasportsgroup.competition.season.rounds.playoff.match.referees.assistant_n2.$.nationality;
			$scope.fourth_official = data.datasportsgroup.competition.season.rounds.playoff.match.referees.fourth_official.$.matchname;
			$scope.fourth_official_n = data.datasportsgroup.competition.season.rounds.playoff.match.referees.fourth_official.$.nationality;
								}catch(e){};						
						};
						};



		try{	$scope.venue_name = data.datasportsgroup.competition.season.rounds.match.$.venue_name;

			$scope.attendance = data.datasportsgroup.competition.season.rounds.match.$.attendance;
			
			$scope.date_utc = data.datasportsgroup.competition.season.rounds.match.$.date_utc;
			$scope.time_utc = data.datasportsgroup.competition.season.rounds.match.$.time_utc;

			$scope.coaches = data.datasportsgroup.competition.season.rounds.match.coaches.coach;
			
			
			

               }catch(e){

                       try{

                           $scope.venue_name = data.datasportsgroup.competition.season.rounds.playoff.match.$.venue_name;

			 $scope.attendance = data.datasportsgroup.competition.season.rounds.playoff.match.$.attendance;
			
			$scope.date_utc = data.datasportsgroup.competition.season.rounds.playoff.match.$.date_utc;
			$scope.time_utc = data.datasportsgroup.competition.season.rounds.playoff.match.$.time_utc;

			$scope.coaches = data.datasportsgroup.competition.season.rounds.playoff.match.coaches.coach;
			
			

                       }catch(e){
						
					try{	

                    $scope.venue_name = data.datasportsgroup.competition.season.rounds.group.match.$.venue_name;

			 $scope.attendance = data.datasportsgroup.competition.season.rounds.group.match.$.attendance;
			
			$scope.date_utc = data.datasportsgroup.competition.season.rounds.group.match.$.date_utc;
			$scope.time_utc = data.datasportsgroup.competition.season.rounds.group.match.$.time_utc;

			$scope.coaches = data.datasportsgroup.competition.season.rounds.group.match.coaches.coach;
			
			
		

					}catch(e){};
			
			
                            }
                      }

                    try{
						$scope.game_minute = data.datasportsgroup.competition.season.rounds.match.$.game_minute;
			           $scope.status1 = data.datasportsgroup.competition.season.rounds.match.$.status;
						
					}catch(e){
						
						try{
							$scope.game_minute = data.datasportsgroup.competition.season.rounds.group.match.$.game_minute;
				$scope.status1 = data.datasportsgroup.competition.season.rounds.group.match.$.status;
							
						}catch(e){
							
			$scope.game_minute = data.datasportsgroup.competition.season.rounds.playoff.match.$.game_minute;
			$scope.status1 = data.datasportsgroup.competition.season.rounds.playoff.match.$.status;
							
						};
						
						
					};
                      
                       try{
						
						   $scope.team_stats1 = data.datasportsgroup.competition.season.rounds.match.team_stats;
						
                       $scope.shots_total_a = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_total.$.team_a;}catch(e){ try{
						    $scope.team_stats1 = data.datasportsgroup.competition.season.rounds.group.match.team_stats;
                       $scope.shots_total_a = data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_total.$.team_a;}catch(e){
						   try{
							    $scope.team_stats1 = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats;
                       $scope.shots_total_a = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_total.$.team_a;
						   }catch(e){};
					   }};
                  

			
                       try{ $scope.shots_on_target_a = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_on_target.$.team_a;}catch(e){ try{$scope.shots_on_target_a = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_on_target.$.team_a;}catch(e){try{$scope.shots_on_target_a = data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_on_target.$.team_a;}catch(e){}}};

			try{ $scope.shots_off_target_a= data.datasportsgroup.competition.season.rounds.match.team_stats.shots_off_target.$.team_a;}catch(e){ try{$scope.shots_off_target_a= data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_off_target.$.team_a;}catch(e){try{$scope.shots_off_target_a= data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_off_target.$.team_a;}catch(e){} }};


			try{ $scope.crosses_a = data.datasportsgroup.competition.season.rounds.match.team_stats.corners.$.team_a;}catch(e){ try{$scope.crosses_a = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.corners.$.team_a;}catch(e){try{$scope.crosses_a = data.datasportsgroup.competition.season.rounds.group.match.team_stats.corners.$.team_a;}catch(e){}}}

			try{ $scope.offsides_a = data.datasportsgroup.competition.season.rounds.match.team_stats.offsides.$.team_a;}catch(e){ try{$scope.offsides_a = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.offsides.$.team_a;}catch(e){try{$scope.offsides_a = data.datasportsgroup.competition.season.rounds.group.match.team_stats.offsides.$.team_a;}catch(e){}}};

			try{ $scope.fouls_a = data.datasportsgroup.competition.season.rounds.match.team_stats.fouls.$.team_a;	}catch(e){ try{$scope.fouls_a = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.fouls.$.team_a;}catch(e){try{$scope.fouls_a = data.datasportsgroup.competition.season.rounds.group.match.team_stats.fouls.$.team_a;}catch(e){}}}

			try{ $scope.saves_a = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_blocked.$.team_a;}catch(e){ try{$scope.saves_a = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_blocked.$.team_a;}catch(e){ try{$scope.saves_a = data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_blocked.$.team_a;}catch(e){}}}	

			
			if(!$scope.shots_total_a && !$scope.shots_on_target_a  && !$scope.shots_off_target_a ){$scope.team_stats1 = '';}
			
			
		try{ $scope.team_a_m = Math.max( $scope.shots_total_a, $scope.shots_on_target_a,$scope.shots_off_target_a,$scope.saves_a,$scope.fouls_a,$scope.offsides_a,$scope.crosses_a); }catch(e){};	


				

             

		      try{  $scope.shots_total_b = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_total.$.team_b;}catch(e){ try{ $scope.shots_total_b = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_total.$.team_b;}catch(e){try{$scope.shots_total_b = data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_total.$.team_b;}catch(e){}}}

			try{ $scope.shots_on_target_b = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_on_target.$.team_b; }catch(e){ try{$scope.shots_on_target_b = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_on_target.$.team_b;}catch(e){try{$scope.shots_on_target_b = data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_on_target.$.team_b;}catch(e){}}}

			try{ $scope.shots_off_target_b= data.datasportsgroup.competition.season.rounds.match.team_stats.shots_off_target.$.team_b; }catch(e){ try{$scope.shots_off_target_b= data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_off_target.$.team_b;}catch(e){try{$scope.shots_off_target_b= data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_off_target.$.team_b;}catch(e){}}}

			try{ $scope.crosses_b = data.datasportsgroup.competition.season.rounds.match.team_stats.corners.$.team_b; }catch(e){ try{$scope.crosses_b = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.corners.$.team_b;}catch(e){try{$scope.crosses_b = data.datasportsgroup.competition.season.rounds.group.match.team_stats.corners.$.team_b;}catch(e){}}}

			try{ $scope.offsides_b = data.datasportsgroup.competition.season.rounds.match.team_stats.offsides.$.team_b; }catch(e){ try{$scope.offsides_b = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.offsides.$.team_b;}catch(e){ try{$scope.offsides_b = data.datasportsgroup.competition.season.rounds.group.match.team_stats.offsides.$.team_b;}catch(e){}}}

			try{ $scope.fouls_b = data.datasportsgroup.competition.season.rounds.match.team_stats.fouls.$.team_b;	 }catch(e){ try{$scope.fouls_b = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.fouls.$.team_b;}catch(e){ try{$scope.fouls_b = data.datasportsgroup.competition.season.rounds.group.match.team_stats.fouls.$.team_b;}catch(e){}}}

			try{$scope.saves_b = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_blocked.$.team_b; }catch(e){ try{$scope.saves_b = data.datasportsgroup.competition.season.rounds.playoff.match.team_stats.shots_blocked.$.team_b;}catch(e){ try{$scope.saves_b = data.datasportsgroup.competition.season.rounds.group.match.team_stats.shots_blocked.$.team_b;}catch(e){}}}

			
			
		try{ $scope.team_b_m = Math.max( $scope.shots_total_b, $scope.shots_on_target_b,$scope.shots_off_target_b,$scope.saves_b,$scope.fouls_b,$scope.offsides_b,$scope.crosses_b);	}catch(e){};		
				
			   
			   $scope.max=Math.max($scope.team_b_m,$scope.team_a_m);
			  
			   
			
			



                     try{    $scope.goals = data.datasportsgroup.competition.season.rounds.match.events.goals.event ;
					 }catch(e){ try{$scope.goals = data.datasportsgroup.competition.season.rounds.playoff.match.events.goals.event ; }catch(e){ try{
					 $scope.goals = data.datasportsgroup.competition.season.rounds.group.match.events.goals.event ; }catch(e){$scope.goals='';}; }}
                           try{
                        Object.keys($scope.goals).forEach(function (key8)
			{
			
			 if(key8 == '$'){
                         if($scope.goals[key8].team_id == $scope.f_id){
							
							
							 if($scope.goals[key8].type == 'goal' || $scope.goals[key8].type == 'penalty_goal'){

                            $scope.score_team_a = 1;
                            $scope.score_team_b = 0;
                            $scope.opponent_team = 'team-b';
                            $scope.opponent_team_score = 0;
                             $scope.win_team = 'team-a';
                            $scope.win_team_score = 1;
							 }
                            if($scope.goals[key8].type == 'own_goal'){
                             $scope.own_goal_a0 = 'true';
                            $scope.score_team_a = 0;
                            $scope.score_team_b = 1;
                            $scope.opponent_team = 'team-a';
                            $scope.opponent_team_score = 0;
                             $scope.win_team = 'team-b';
                            $scope.win_team_score = 1;
							 }
                             window.localStorage.setItem('score_team_a',$scope.score_team_a);
                               window.localStorage.setItem('score_team_b',$scope.score_team_b);




                           }else{

                               if($scope.goals[key8].type == 'goal' || $scope.goals[key8].type == 'penalty_goal'){						
                              $scope.score_team_b = 1;
                            $scope.score_team_a = 0;
                            $scope.opponent_team = 'team-a';
                             $scope.opponent_team_score = 0;

                            $scope.win_team = 'team-b';
                            $scope.win_team_score = 1;
							   }
							if($scope.goals[key8].type == 'own_goal'){
							$scope.own_goal_b0 = 'true';
							 $scope.score_team_b = 0;
                            $scope.score_team_a = 1;
                            $scope.opponent_team = 'team-b';
                             $scope.opponent_team_score = 0;

                            $scope.win_team = 'team-a';
                            $scope.win_team_score = 1;
							
							
							
							}
							
                             window.localStorage.setItem('score_team_a',$scope.score_team_a);
                              window.localStorage.setItem('score_team_b',$scope.score_team_b);




                            }
							
							 if($scope.goals[key8].game_minute_extra){
								
								$scope.goals[key8].game_minute1=$scope.goals[key8].game_minute+'+'+$scope.goals[key8].game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].game_minute1= $scope.goals[key8].game_minute;



                                     }
                          }
			
			
			
			
			
			
			
			if(key8 == 0){
                         if($scope.goals[key8].$.team_id == $scope.f_id){
                             if($scope.goals[key8].$.type == 'goal'  || $scope.goals[key8].$.type == 'penalty_goal'){	
                            $scope.score_team_a = 1;
                            $scope.score_team_b = 0;
                            $scope.opponent_team = 'team-b';
                            $scope.opponent_team_score = 0;
                             $scope.win_team = 'team-a';
                            $scope.win_team_score = 1;
							
							 }
							 	if($scope.goals[key8].$.type == 'own_goal'){
							$scope.own_goal_a0 = 'true';
							$scope.score_team_a = 0;
                            $scope.score_team_b = 1;
                            $scope.opponent_team = 'team-a';
                            $scope.opponent_team_score = 0;
                             $scope.win_team = 'team-b';
                            $scope.win_team_score = 1;
								}
							

                             window.localStorage.setItem('score_team_a',$scope.score_team_a);
                               window.localStorage.setItem('score_team_b',$scope.score_team_b);




                           }else{
                               if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){						
                              $scope.score_team_b = 1;
                            $scope.score_team_a = 0;
                            $scope.opponent_team = 'team-a';
                             $scope.opponent_team_score = 0;

                            $scope.win_team = 'team-b';
                            $scope.win_team_score = 1;
							
							   }
							   	 	if($scope.goals[key8].$.type == 'own_goal'){
										$scope.own_goal_b0 = 'true';
							$scope.score_team_b = 0;
                            $scope.score_team_a = 1;
                            $scope.opponent_team = 'team-b';
                             $scope.opponent_team_score = 0;

                            $scope.win_team = 'team-a';
                            $scope.win_team_score = 1;	
										
										
									}
							
                             window.localStorage.setItem('score_team_a',$scope.score_team_a);
                              window.localStorage.setItem('score_team_b',$scope.score_team_b);




                            }
							
								 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;



                                     }
							
                          }

                          if(key8 == 1){
                         if($scope.goals[key8].$.team_id == $scope.f_id){
							
							
							   if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){	

                            $scope.score_team_a1 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team1= 'team-b';
                            $scope.opponent_team_score1 = window.localStorage.getItem('score_team_b');
                              $scope.win_team1 = 'team-a';
                            $scope.win_team_score1 = parseInt(window.localStorage.getItem('score_team_a'))+1;
							  window.localStorage.setItem('score_team_a',$scope.score_team_a1);
							
							   }
							   if($scope.goals[key8].$.type == 'own_goal'){
								   $scope.own_goal_a1 = 'true';
							$scope.score_team_b1 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                            $scope.opponent_team1= 'team-a';
                            $scope.opponent_team_score1 = window.localStorage.getItem('score_team_a');
                              $scope.win_team1 = 'team-b';
                            $scope.win_team_score1 = parseInt(window.localStorage.getItem('score_team_b'))+1;
							 window.localStorage.setItem('score_team_b',$scope.score_team_b1);
								
							   }







                           }else{
						
                            if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){							

                            $scope.score_team_b1 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team1 = 'team-a';
                            $scope.opponent_team_score1 = parseInt(window.localStorage.getItem('score_team_a'));

                              $scope.win_team1 = 'team-b';
                            $scope.win_team_score1 = parseInt(window.localStorage.getItem('score_team_b'))+1;
							 window.localStorage.setItem('score_team_b',$scope.score_team_b1);

							}
							 if($scope.goals[key8].$.type == 'own_goal'){
								 $scope.own_goal_b1 = 'true';
								 $scope.score_team_a1 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              $scope.opponent_team1 = 'team-b';
                            $scope.opponent_team_score1 = parseInt(window.localStorage.getItem('score_team_b'));

                              $scope.win_team1 = 'team-a';
                            $scope.win_team_score1 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a1);							
								
							 }





                             }
							 	 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;



                                     }
                          }


                       if(key8 == 2){
                         if($scope.goals[key8].$.team_id == $scope.f_id){
                                if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_a2 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team2= 'team-b';
                            $scope.opponent_team_score2 = window.localStorage.getItem('score_team_b');

                              $scope.win_team2 = 'team-a';
                            $scope.win_team_score2 = parseInt(window.localStorage.getItem('score_team_a'))+1;
							window.localStorage.setItem('score_team_a',$scope.score_team_a2);
								}
								 if($scope.goals[key8].$.type == 'own_goal'){
									 $scope.own_goal_a2 = 'true';
							$scope.score_team_b2 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                            $scope.opponent_team2= 'team-a';
                            $scope.opponent_team_score2 = window.localStorage.getItem('score_team_a');

                              $scope.win_team2 = 'team-b';
                            $scope.win_team_score2 = parseInt(window.localStorage.getItem('score_team_b'))+1;
									 window.localStorage.setItem('score_team_b',$scope.score_team_b2);
								 }


                           }else{
                                  if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_b2 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team2 = 'team-a';
                            $scope.opponent_team_score2 = window.localStorage.getItem('score_team_a');
                              $scope.win_team2 = 'team-b';
                            $scope.win_team_score2 = parseInt(window.localStorage.getItem('score_team_b'))+1;
							 window.localStorage.setItem('score_team_b',$scope.score_team_b2);
								  }
								   if($scope.goals[key8].$.type == 'own_goal'){
									   $scope.own_goal_b2 = 'true';
							 $scope.score_team_a2 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              $scope.opponent_team2 = 'team-b';
                            $scope.opponent_team_score2 = window.localStorage.getItem('score_team_b');
                              $scope.win_team2 = 'team-a';
                            $scope.win_team_score2 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              window.localStorage.setItem('score_team_a',$scope.score_team_a2);							
									
									
								   }
								
								








                             }
							
							 	 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;



                                     }
                          }


                            if(key8 == 3){
                              if($scope.goals[key8].$.team_id == $scope.f_id){
                            if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_a3 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team3= 'team-b';
                            $scope.opponent_team_score3 = window.localStorage.getItem('score_team_b');

                              $scope.win_team3 = 'team-a';
                            $scope.win_team_score3 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a3);
							
							}
							     if($scope.goals[key8].$.type == 'own_goal'){
									 $scope.own_goal_a3 = 'true';
                            $scope.score_team_b3 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                            $scope.opponent_team3= 'team-a';
                            $scope.opponent_team_score3 = window.localStorage.getItem('score_team_a');

                              $scope.win_team3 = 'team-b';
                            $scope.win_team_score3 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b3);
							
							}

                           }else{
                               if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_b3 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team3 = 'team-a';
                            $scope.opponent_team_score3 = window.localStorage.getItem('score_team_a');
                              $scope.win_team3 = 'team-b';
                            $scope.win_team_score3 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b3);

							   }
							       if($scope.goals[key8].$.type == 'own_goal'){
									   $scope.own_goal_b3 = 'true';
                            $scope.score_team_a3 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              $scope.opponent_team3 = 'team-b';
                            $scope.opponent_team_score3 = window.localStorage.getItem('score_team_b');
                              $scope.win_team3 = 'team-a';
                            $scope.win_team_score3 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a3);

							   }





                             }
							
							 	 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;
                                    }
                          }



                              if(key8 == 4){
                              if($scope.goals[key8].$.team_id == $scope.f_id){
                            if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_a4 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team4= 'team-b';
                            $scope.opponent_team_score4 = window.localStorage.getItem('score_team_b');

                              $scope.win_team4 = 'team-a';
                            $scope.win_team_score4 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a4);
							
							}
							  if($scope.goals[key8].$.type == 'own_goal'){
								  $scope.own_goal_a4 = 'true';
							$scope.score_team_b4 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                            $scope.opponent_team4= 'team-a';
                            $scope.opponent_team_score4 = window.localStorage.getItem('score_team_a');

                              $scope.win_team4 = 'team-b';
                            $scope.win_team_score4 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b4);
							  }

                           }else{
                             if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_b4 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team4 = 'team-a';
                            $scope.opponent_team_score4 = window.localStorage.getItem('score_team_a');
                              $scope.win_team4 = 'team-b';
                            $scope.win_team_score4 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b4);

                             }
							  if($scope.goals[key8].$.type == 'own_goal'){
								  $scope.own_goal_b4 = 'true';
							$scope.score_team_b4 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              $scope.opponent_team4 = 'team-b';
                            $scope.opponent_team_score4 = window.localStorage.getItem('score_team_b');
                              $scope.win_team4 = 'team-a';
                            $scope.win_team_score4 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a4);
								
							  }





                             }
							
							 	 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;



                                     }
                          }
                            if(key8 == 5){
                              if($scope.goals[key8].$.team_id == $scope.f_id){
                             if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_a5 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team5= 'team-b';
                            $scope.opponent_team_score5 = window.localStorage.getItem('score_team_b');

                              $scope.win_team5 = 'team-a';
                            $scope.win_team_score5 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a5);
							 }
							   if($scope.goals[key8].$.type == 'own_goal'){
								   $scope.own_goal_a5 = 'true';
						    $scope.score_team_a5 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                            $scope.opponent_team5= 'team-a';
                            $scope.opponent_team_score5 = window.localStorage.getItem('score_team_a');

                              $scope.win_team5 = 'team-b';
                            $scope.win_team_score5 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b5);
								
							   }
							

                           }else{
                             if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_b5 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team5 = 'team-a';
                            $scope.opponent_team_score5 = window.localStorage.getItem('score_team_a');
                              $scope.win_team5 = 'team-b';
                            $scope.win_team_score5 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b5);

							 }
							 	   if($scope.goals[key8].$.type == 'own_goal'){
									 $scope.own_goal_b5 = 'true';
								$scope.score_team_b5 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              $scope.opponent_team5 = 'team-b';
                            $scope.opponent_team_score5 = window.localStorage.getItem('score_team_b');
                              $scope.win_team5 = 'team-a';
                            $scope.win_team_score5 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a5);
								
								   }





                             }
							
							 	 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;



                                     }
                          }
						
						   if(key8 == 6){
                              if($scope.goals[key8].$.team_id == $scope.f_id){
                             if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_a6 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team6= 'team-b';
                            $scope.opponent_team_score6 = window.localStorage.getItem('score_team_b');

                              $scope.win_team6 = 'team-a';
                            $scope.win_team_score6 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a6);
							 }
							   if($scope.goals[key8].$.type == 'own_goal'){
								   $scope.own_goal_a6 = 'true';
						    $scope.score_team_a6 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                            $scope.opponent_team6= 'team-a';
                            $scope.opponent_team_score6 = window.localStorage.getItem('score_team_a');

                              $scope.win_team6 = 'team-b';
                            $scope.win_team_score6 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b6);
								
							   }
							

                           }else{
                             if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_b6 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team6 = 'team-a';
                            $scope.opponent_team_score6 = window.localStorage.getItem('score_team_a');
                              $scope.win_team6 = 'team-b';
                            $scope.win_team_score6 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b6);

							 }
							 	   if($scope.goals[key8].$.type == 'own_goal'){
								$scope.own_goal_b6 = 'true';	
								$scope.score_team_b6 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              $scope.opponent_team6 = 'team-b';
                            $scope.opponent_team_score6 = window.localStorage.getItem('score_team_b');
                              $scope.win_team6 = 'team-a';
                            $scope.win_team_score6 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a6);
								
								   }





                             }
							 	 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;



                                     }
                          }
						
						     if(key8 == 7){
                              if($scope.goals[key8].$.team_id == $scope.f_id){
                             if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_a7 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                            $scope.opponent_team7= 'team-b';
                            $scope.opponent_team_score7 = window.localStorage.getItem('score_team_b');

                              $scope.win_team7 = 'team-a';
                            $scope.win_team_score7 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a7);
							 }
							   if($scope.goals[key8].$.type == 'own_goal'){
								   $scope.own_goal_a7 = 'true';
						    $scope.score_team_a7 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                            $scope.opponent_team7= 'team-a';
                            $scope.opponent_team_score7 = window.localStorage.getItem('score_team_a');

                              $scope.win_team7 = 'team-b';
                            $scope.win_team_score7 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b7);
								
							   }
							

                           }else{
                             if($scope.goals[key8].$.type == 'goal' || $scope.goals[key8].$.type == 'penalty_goal'){
                            $scope.score_team_b7 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                              $scope.opponent_team7 = 'team-a';
                            $scope.opponent_team_score7 = window.localStorage.getItem('score_team_a');
                              $scope.win_team7 = 'team-b';
                            $scope.win_team_score7 = parseInt(window.localStorage.getItem('score_team_b'))+1;
                             window.localStorage.setItem('score_team_b',$scope.score_team_b7);

							 }
							 	   if($scope.goals[key8].$.type == 'own_goal'){
								$scope.own_goal_b7 = 'true';	
								$scope.score_team_b7 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                              $scope.opponent_team7 = 'team-b';
                            $scope.opponent_team_score7 = window.localStorage.getItem('score_team_b');
                              $scope.win_team7 = 'team-a';
                            $scope.win_team_score7 = parseInt(window.localStorage.getItem('score_team_a'))+1;
                             window.localStorage.setItem('score_team_a',$scope.score_team_a7);
								
								   }





                             }
							 	 if($scope.goals[key8].$.game_minute_extra){
								
								$scope.goals[key8].$.game_minute1=$scope.goals[key8].$.game_minute+'+'+$scope.goals[key8].$.game_minute_extra;
							

                             }else{
                                     $scope.goals[key8].$.game_minute1= $scope.goals[key8].$.game_minute;



                                     }
                          }
						



                        });





 }catch(e){
 };
 
                        try{
							 	 $scope.round_name1 = data.datasportsgroup.competition.season.rounds.$.name;
							
                      	 $scope.t_pen_a = data.datasportsgroup.competition.season.rounds.match.$.team_a_current_name;
					    $scope.t_pen_b = data.datasportsgroup.competition.season.rounds.match.$.team_b_current_name;
							 $scope.score_pen_a = data.datasportsgroup.competition.season.rounds.match.$.score_pen_a;
					    $scope.score_pen_b = data.datasportsgroup.competition.season.rounds.match.$.score_pen_b;
						 $scope.score_period = data.datasportsgroup.competition.season.rounds.match.$.final_period;
						 $scope.winner_t = data.datasportsgroup.competition.season.rounds.match.$.winner;
							 }catch(e){
          try{
			   	        $scope.t_pen_a = data.datasportsgroup.competition.season.rounds.playoff.match.$.team_a_current_name;
					    $scope.t_pen_b = data.datasportsgroup.competition.season.rounds.playoff.match.$.team_b_current_name;
							 $scope.score_pen_a = data.datasportsgroup.competition.season.rounds.playoff.match.$.score_pen_a;
					    $scope.score_pen_b = data.datasportsgroup.competition.season.rounds.playoff.match.$.score_pen_b;
						 $scope.score_period = data.datasportsgroup.competition.season.rounds.playoff.match.$.final_period;
						 $scope.winner_t = data.datasportsgroup.competition.season.rounds.playoff.match.$.winner;
						
		  }catch(e){
			  
			           $scope.t_pen_a = data.datasportsgroup.competition.season.rounds.group.match.$.team_a_current_name;
					   $scope.t_pen_b = data.datasportsgroup.competition.season.rounds.group.match.$.team_b_current_name;
					   	 $scope.score_pen_a = data.datasportsgroup.competition.season.rounds.group.match.$.score_pen_a;
					    $scope.score_pen_b = data.datasportsgroup.competition.season.rounds.group.match.$.score_pen_b;
						 $scope.score_period = data.datasportsgroup.competition.season.rounds.group.match.$.final_period;
						 $scope.winner_t = data.datasportsgroup.competition.season.rounds.group.match.$.winner;
			  
		  }

							 }

                       try{
					
						
					if($scope.score_pen_a != '0' && $scope.score_pen_b != '0'){$scope.pen_shootout_check = 'true';}
						
					if( $scope.score_period == 'soc_pen' ){$scope.pen_shootout = 'true';
					if($scope.score_pen_a > $scope.score_pen_b){$scope.win_team_pen = $scope.t_pen_a;
					$scope.win_team_pen_score = $scope.score_pen_a;
					$scope.opp_team_pen_score = $scope.score_pen_b;
					}else{ 	if($scope.winner_t == 'team_B'){$scope.win_team_pen = $scope.t_pen_b;
					$scope.win_team_pen_score = $scope.score_pen_b;
					$scope.opp_team_pen_score = $scope.score_pen_a;
					}
						if($scope.winner_t == 'team_A'){$scope.win_team_pen = $scope.t_pen_a;
					$scope.win_team_pen_score = $scope.score_pen_a;
					$scope.opp_team_pen_score = $scope.score_pen_b;
					}
					}
					
					}
						
					 }catch(e){
					 $scope.pen_shootout = 'false';};

                    try{     $scope.penalty_shootout= data.datasportsgroup.competition.season.rounds.match.events.penalty_shootout.event ; }catch(e){
						try{$scope.penalty_shootout= data.datasportsgroup.competition.season.rounds.playoff.match.events.penalty_shootout.event ;}catch(e){
							try{$scope.penalty_shootout= data.datasportsgroup.competition.season.rounds.group.match.events.penalty_shootout.event ;}catch(e){$scope.penalty_shootout='';}
						}
						
					};
					
					
					try{
						 $scope.pen_shootout_player= [];
						 var conversion1=[];
						
						if($scope.penalty_shootout){
							
							
			
			
		
							
					
							
					Object.keys($scope.penalty_shootout).forEach(function (key)
			{
				
					
				
				      $scope.pen_shootout_player.push({id: $scope.penalty_shootout[key].$.player_id, name: $scope.penalty_shootout[key].$.matchname, team_id : $scope.penalty_shootout[key].$.team_id, type: $scope.penalty_shootout[key].$.type});
					
					
					if($scope.penalty_shootout[key].$.order == 1){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
                             if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	
                            $scope.score_pen_a1 = 1;
                            $scope.score_pen_b1 = 0;
                        
							
							 }else{
								   $scope.score_pen_a1 = 0;
                            $scope.score_pen_b1 = 0;
                        
								
								
							 }
							
							

                             window.localStorage.setItem('score_pen_a',$scope.score_pen_a1);
                               window.localStorage.setItem('score_pen_b',$scope.score_pen_b1);




                           }else{
                               if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	
                            $scope.score_pen_a1 = 0;
                            $scope.score_pen_b1 = 1;
                          
							
							 }else{
								   $scope.score_pen_a1 = 0;
                            $scope.score_pen_b1 = 0;
                         
								
								
							 }
							
							

                             window.localStorage.setItem('score_pen_a',$scope.score_pen_a1);
                               window.localStorage.setItem('score_pen_b',$scope.score_pen_b1);




                            }
                          }

                          if($scope.penalty_shootout[key].$.order ==  2){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a2 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b2 = parseInt(window.localStorage.getItem('score_pen_b'));
                     
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a2);
							
							   }else{
								    $scope.score_pen_a2 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b2 = parseInt(window.localStorage.getItem('score_pen_b'));
                           
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a2 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b2 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                         
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b2);
							
							   }else{
								    $scope.score_pen_a2 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b2 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  3){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a3 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b3 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a3);
							
							   }else{
								    $scope.score_pen_a3 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b3 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a3 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b3 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                          
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b3);
							
							   }else{
								    $scope.score_pen_a3 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b3 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
								
							   }
							





                             }
                          }
						
						       if($scope.penalty_shootout[key].$.order ==  4){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a4 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b4 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a4);
							
							   }else{
								    $scope.score_pen_a4 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b4 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a4 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b4 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                         
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b4);
							
							   }else{
								    $scope.score_pen_a4 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b4 = parseInt(window.localStorage.getItem('score_pen_b'));
                       
								
							   }
							





                             }
                          }
						
						       if($scope.penalty_shootout[key].$.order ==  5){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a5 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b5 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a5);
							
							   }else{
								    $scope.score_pen_a5 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b5 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a5 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b5 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                          
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b5);
							
							   }else{
								    $scope.score_pen_a5 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b5 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  6){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a6 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b6 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a6);
							
							   }else{
								    $scope.score_pen_a6 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b6 = parseInt(window.localStorage.getItem('score_pen_b'));
                       
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a6 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b6 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                          
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b6);
							
							   }else{
								    $scope.score_pen_a6 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b6 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  7){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a7 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b7 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a7);
							
							   }else{
								    $scope.score_pen_a7 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b7 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a7 = parseInt(window.localStorage.getItem('score_pen_a'));
							
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b7);
							
							   }else{
								    $scope.score_pen_a7 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b7 = parseInt(window.localStorage.getItem('score_pen_b'));
                        
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  8){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a8 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b8 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a8);
							
							   }else{
								    $scope.score_pen_a8 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b8 = parseInt(window.localStorage.getItem('score_pen_b'));
                           
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a8 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b8 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                         
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b8);
							
							   }else{
								    $scope.score_pen_a8 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b8 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  9){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a9 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b9 = parseInt(window.localStorage.getItem('score_pen_b'));
                           
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a9);
							
							   }else{
								    $scope.score_pen_a9 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b9 = parseInt(window.localStorage.getItem('score_pen_b'));
                           
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a9 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b9 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                          
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b9);
							
							   }else{
								    $scope.score_pen_a9 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b9 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  10){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a10 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b10 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a10);
							
							   }else{
								    $scope.score_pen_a10 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b10 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a10 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b10 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                        
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b10);
							
							   }else{
								    $scope.score_pen_a10 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b10 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  11){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a11 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b11 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a11);
							
							   }else{
								    $scope.score_pen_a11 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b11 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a11 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b11 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                         
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b11);
							
							   }else{
								    $scope.score_pen_a11 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b11 = parseInt(window.localStorage.getItem('score_pen_b'));
                          
								
							   }
							





                             }
                          }
						       if($scope.penalty_shootout[key].$.order ==  12){
                         if($scope.penalty_shootout[key].$.team_id == $scope.f_id){
							
							
							   if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a12 = parseInt(window.localStorage.getItem('score_pen_a'))+1;
							$scope.score_pen_b12 = parseInt(window.localStorage.getItem('score_pen_b'));
                           
							  window.localStorage.setItem('score_pen_a',$scope.score_pen_a12);
							
							   }else{
								    $scope.score_pen_a12 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b12 = parseInt(window.localStorage.getItem('score_pen_b'));
                         
								
							   }
							



                           }else{
						
                              if($scope.penalty_shootout[key].$.type == 'penalty_shootout_goal' ){	

                            $scope.score_pen_a12 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b12 = parseInt(window.localStorage.getItem('score_pen_b'))+1;
                           
							  window.localStorage.setItem('score_pen_b',$scope.score_pen_b12);
							
							   }else{
								    $scope.score_pen_a12 = parseInt(window.localStorage.getItem('score_pen_a'));
							$scope.score_pen_b12 = parseInt(window.localStorage.getItem('score_pen_b'));
                           
								
							   }
							





                             }
                          }
						



				
			});
							
						}
						
						
					}catch(e){
					};


                    try{     $scope.bookings= data.datasportsgroup.competition.season.rounds.match.events.bookings.event ; }catch(e){
						try{$scope.bookings= data.datasportsgroup.competition.season.rounds.playoff.match.events.bookings.event ;}catch(e){
							try{$scope.bookings= data.datasportsgroup.competition.season.rounds.group.match.events.bookings.event ;}catch(e){}
						}
						
					};
					
					
                    try{     $scope.assists= data.datasportsgroup.competition.season.rounds.match.events.assists.event ; }catch(e){
						try{$scope.assists= data.datasportsgroup.competition.season.rounds.playoff.match.events.assists.event ;}catch(e){
							try{$scope.assists= data.datasportsgroup.competition.season.rounds.group.match.events.assists.event ;}catch(e){}
						}
						
					};
					
                     try{    $scope.substitutions= data.datasportsgroup.competition.season.rounds.match.events.substitutions.event; }catch(e){
						 try{$scope.substitutions= data.datasportsgroup.competition.season.rounds.playoff.match.events.substitutions.event;}catch(e){
							try{$scope.substitutions= data.datasportsgroup.competition.season.rounds.group.match.events.substitutions.event;}catch(e){}
						}
						
					 };

			
		  try{	$scope.subs_on_bench = data.datasportsgroup.competition.season.rounds.match.events.subs_on_bench.event;
                 $scope.others = data.datasportsgroup.competition.season.rounds.match.events.others.event;
		  }catch(e){

                   try{
                  $scope.subs_on_bench = data.datasportsgroup.competition.season.rounds.playoff.match.events.subs_on_bench.event;
				  $scope.others = data.datasportsgroup.competition.season.rounds.playoff.match.events.others.event;
                      }catch(e){try{$scope.subs_on_bench = data.datasportsgroup.competition.season.rounds.group.match.events.subs_on_bench.event;
					  	  $scope.others = data.datasportsgroup.competition.season.rounds.group.match.events.others.event;
					  }catch(e){$scope.subs_on_bench ="";  $scope.others ='';}}
                   };
                
                       if($scope.subs_on_bench){
						
						
                        Object.keys($scope.subs_on_bench).forEach(function (key5)
			{

                  try{
                          Object.keys($scope.substitutions).forEach(function (key6)
			{

                       if($scope.subs_on_bench[key5].$.player_id == $scope.substitutions[key6].$.player_id){
							 
							 if($scope.substitutions[key6].$.type == 'substitute_in'){
                              if($scope.substitutions[key6].$.game_minute_extra){
                              $scope.subs_on_bench[key5].$.subs_in = $scope.substitutions[key6].$.game_minute+'+'+$scope.substitutions[key6].$.game_minute_extra;
                              }else
                              {
                               $scope.subs_on_bench[key5].$.subs_in = $scope.substitutions[key6].$.game_minute;
                               }
							 }else{
								     if($scope.substitutions[key6].$.game_minute_extra){
                              $scope.subs_on_bench[key5].$.subs_out = $scope.substitutions[key6].$.game_minute+'+'+$scope.substitutions[key6].$.game_minute_extra;
                              }else
                              {
                               $scope.subs_on_bench[key5].$.subs_out = $scope.substitutions[key6].$.game_minute;
                               }
							 }
                             }


                        });
						
			   }catch(e){};
			
			    try{
              				$scope.subs_on_bench[key5].goal_count = 0;

							  var goal_tot=0;
							  var goal_count_tot=[];							
                          Object.keys($scope.goals).forEach(function (key7)
			{

                          if(key7 == '$'){
                             if($scope.subs_on_bench[key5].$.player_id  == $scope.goals[key7].player_id){

                             if($scope.goals[key7].game_minute_extra){
                             $scope.subs_on_bench[key5].$.goals = $scope.goals[key7].game_minute+'+'+$scope.goals[key7].game_minute_extra;
							

                             }else{
                                     $scope.subs_on_bench[key5].$.goals = $scope.goals[key7].game_minute;



                                     }
							$scope.subs_on_bench[key5].$.goals_type= $scope.goals[key7].type;


									
                             }

                                   }else{
                         if($scope.subs_on_bench[key5].$.player_id == $scope.goals[key7].$.player_id){
							
							
							     if($scope.goals[key7].$.type != 'own_goal'){
                            $scope.subs_on_bench[key5].goal_count += 1;
							}
                              goal_tot += 1;
                            if(goal_tot <= 1){



                             if($scope.goals[key7].$.game_minute_extra){
                             $scope.subs_on_bench[key5].$.goals= $scope.goals[key7].$.game_minute+'+'+$scope.goals[key7].$.game_minute_extra;
                        $scope.subs_on_bench[key5].$.goals_type= $scope.goals[key7].$.type;
					
                             }else{
                                     $scope.subs_on_bench[key5].$.goals= $scope.goals[key7].$.game_minute;
                             $scope.subs_on_bench[key5].$.goals_type= $scope.goals[key7].$.type;

                                     }
								
                                 } else if(goal_tot == 2){
                                         if($scope.goals[key7].$.game_minute_extra){
                                            $scope.subs_on_bench[key5].$.goals_two= $scope.goals[key7].$.game_minute+'+'+$scope.goals[key7].$.game_minute_extra;
											  $scope.subs_on_bench[key5].$.goals_type_two= $scope.goals[key7].$.type;

                                         }else{
                                                 $scope.subs_on_bench[key5].$.goals_two= $scope.goals[key7].$.game_minute;
                                        $scope.subs_on_bench[key5].$.goals_type_two= $scope.goals[key7].$.type;
                                              }



                                       }else  if(goal_tot == 3){
										
										    if($scope.goals[key7].$.game_minute_extra){
                                            $scope.subs_on_bench[key5].$.goals_three= $scope.goals[key7].$.game_minute+'+'+$scope.goals[key7].$.game_minute_extra;
											 $scope.subs_on_bench[key5].$.goals_type_three= $scope.goals[key7].$.type;

                                         }else{
                                                 $scope.subs_on_bench[key5].$.goals_three= $scope.goals[key7].$.game_minute;
                                        $scope.subs_on_bench[key5].$.goals_type_three= $scope.goals[key7].$.type;
                                              }

										
										
										
										
										
									   }else{
										
										      if($scope.goals[key1].$.game_minute_extra){
                                          $scope.subs_on_bench[key5].$.goals_four= $scope.goals[key7].$.game_minute+'+'+$scope.goals[key7].$.game_minute_extra;
											  $scope.subs_on_bench[key5].$.goals_type_four= $scope.goals[key7].$.type;

                                         }else{
                                                 $scope.subs_on_bench[key5].$.goals_four= $scope.goals[key7].$.game_minute;
                                       $scope.subs_on_bench[key5].$.goals_type_four= $scope.goals[key7].$.type;
                                              }

										
										
										
									   }
                             }

                              }


                        });
						
			   }catch(e){};
			
			
			          try{
					  	$scope.subs_on_bench[key5].card_count = 0;
					     var card_tot=0;


					 Object.keys($scope.bookings).forEach(function (key4)
			{         if(key4 == '$'){
                         if($scope.subs_on_bench[key5].$.player_id == $scope.bookings[key4].player_id){
                              if($scope.bookings[key4].game_minute_extra){
                              $scope.subs_on_bench[key5].$.y_cards = $scope.bookings[key4].game_minute+'+'+$scope.bookings[key4].game_minute_extra;
							  $scope.subs_on_bench[key5].$.cards_type = $scope.bookings[key4].type;
                              }else{
                                    $scope.subs_on_bench[key5].$.y_cards = $scope.bookings[key4].game_minute;
									$scope.subs_on_bench[key5].$.cards_type = $scope.bookings[key4].type;
                                    }

                             }
			             }else{
							
							   if($scope.subs_on_bench[key5].$.player_id == $scope.bookings[key4].$.player_id){
								        card_tot += 1;
                           if($scope.bookings[key4].$.type != 'yellow_card'){
                            $scope.subs_on_bench[key5].card_count += 1;
							}
								
							     if(card_tot <= 1){
                              if($scope.bookings[key4].$.game_minute_extra){
                              $scope.subs_on_bench[key5].$.y_cards = $scope.bookings[key4].$.game_minute+'+'+$scope.bookings[key4].$.game_minute_extra;
							  $scope.subs_on_bench[key5].$.cards_type = $scope.bookings[key4].$.type;
                              }else{
                                    $scope.subs_on_bench[key5].$.y_cards = $scope.bookings[key4].$.game_minute;
									$scope.subs_on_bench[key5].$.cards_type = $scope.bookings[key4].$.type;
                                    }
							   }else if(card_tot == 2){
								      if($scope.bookings[key4].$.game_minute_extra){
                              $scope.subs_on_bench[key5].$.cards_two = $scope.bookings[key4].$.game_minute+'+'+$scope.bookings[key4].$.game_minute_extra;
							  $scope.subs_on_bench[key5].$.cards_two_type = $scope.bookings[key4].$.type;
                              }else{
                                    $scope.subs_on_bench[key5].$.cards_two = $scope.bookings[key4].$.game_minute;
									$scope.subs_on_bench[key5].$.cards_two_type = $scope.bookings[key4].$.type;
                                    }
							   }else {
								   if($scope.bookings[key4].$.game_minute_extra){
                              $scope.subs_on_bench[key5].$.cards_three = $scope.bookings[key4].$.game_minute+'+'+$scope.bookings[key4].$.game_minute_extra;
							  $scope.subs_on_bench[key5].$.cards_three_type = $scope.bookings[key4].$.type;
                              }else{
                                    $scope.subs_on_bench[key5].$.cards_three = $scope.bookings[key4].$.game_minute;
									$scope.subs_on_bench[key5].$.cards_three_type = $scope.bookings[key4].$.type;
                                    }
									}
                             }
							
						 }


                        });
						}catch(e){}
			
			
			     try{
					       Object.keys($scope.others).forEach(function (key3)
			        {
					if(key3 == '$'){
						if($scope.subs_on_bench[key5].$.player_id == $scope.others[key3].player_id){
						$scope.subs_on_bench[key5].$.other_event = $scope.others[key3].game_minute;
						$scope.subs_on_bench[key5].$.other_event_type = $scope.others[key3].type;
						}
					}else{
						   if($scope.subs_on_bench[key5].$.player_id == $scope.others[key3].$.player_id){
						$scope.subs_on_bench[key5].$.other_event = $scope.others[key3].$.game_minute;
						$scope.subs_on_bench[key5].$.other_event_type = $scope.others[key3].$.type;
						
						   }
					}
					});
					
					
				 }catch(e){}
			

                        });


             }



                      try{  $scope.cap1_id = data.datasportsgroup.competition.season.rounds.match.captains.captain[0].$.people_id;}catch(e){}
		try{	$scope.cap2_id = data.datasportsgroup.competition.season.rounds.match.captains.captain[1].$.people_id;}catch(e){}

			if($scope.goals){
                             Object.keys($scope.goals).forEach(function (key1)
			        {
                         try{
                         Object.keys($scope.assists).forEach(function (key2)
			               {
			 if(key1 == '$'){

                        if(key2 == '$'){
                                        if($scope.goals[key1].event_id == $scope.assists[key2].related_event_id){
                                       $scope.f_table[key1] = $scope.assists[key2].matchname ;


						                       }
                                      }else{
					    if($scope.goals[key1].event_id == $scope.assists[key2].$.related_event_id){
                                             $scope.f_table[key1]= $scope.assists[key2].$.matchname ;


						                       }
										
										
										
									       }
                             }else{
                               if(key2 == '$'){
                                        if($scope.goals[key1].$.event_id == $scope.assists[key2].related_event_id){
                                       $scope.f_table[key1] = $scope.assists[key2].matchname ;


						                       }
                                      }else{
					   if($scope.goals[key1].$.event_id == $scope.assists[key2].$.related_event_id){

                                             $scope.f_table[key1] = $scope.assists[key2].$.matchname ;


						                       }
										
										
										
									       }
                             }
						   });
						
						 }catch(e){};


					});


		}



		try{	$scope.lineups = data.datasportsgroup.competition.season.rounds.match.events.lineups.event; }catch(e){
                        try{
                       $scope.lineups = data.datasportsgroup.competition.season.rounds.playoff.match.events.lineups.event;
                      }catch(e){ try{$scope.lineups = data.datasportsgroup.competition.season.rounds.group.match.events.lineups.event;}catch(e){$scope.lineups = null;}}

                     };

                     if($scope.lineups){

	Object.keys($scope.lineups).forEach(function (key)
			{
			if(key == 0){
			if($scope.lineups[key].$.team_id == $scope.s_id){
				
				$scope.lineups = $scope.lineups;
			}
				
			}
			if(key == 0){
			if($scope.lineups[key].$.team_id == $scope.f_id){
				Object.keys($scope.lineups).forEach(function (key9)
			{
				
                           
                               if(parseInt(key9) >= 11 ){
                              conversion[(parseInt(key9) - 11) ] = $scope.lineups[parseInt(key9)];
                               }

                                if(parseInt(key9) < 11){
                               conversion[(11 + parseInt(key9)) ] = $scope.lineups[parseInt(key9)];
                               }

				
			});	
                 	}
				
			}
			
			
			});	
                    

                   if(conversion.length > 1){$scope.lineups = conversion ;}



                       if($scope.lineups[0].$.pitch_position_horiz == '' && $scope.lineups[0].$.pitch_position_vert == '' && $scope.lineups[1].$.pitch_position_horiz == '' && $scope.lineups[1].$.pitch_position_vert == '')
                          {$scope.player_pos = 'false';  }
			Object.keys($scope.lineups).forEach(function (key)
			{
                         array_s[0]=$scope.lineups[key].$.pitch_position_horiz;
                         array_s[1]=$scope.lineups[key].$.pitch_position_vert;
                         $scope.names = $scope.lineups[key].$.matchname;

                       if(array_s[0] != null && array_s[1] != null){
                           $(document).ready(function () {

 var horiz_total = 50;
 var vert_total = 60;


if(key<11){
 var pitch_position_horiz = array_s[0];
 var pitch_position_vert = array_s[1];

 var horiz_per = pitch_position_horiz*100/horiz_total;
 var vert_per = pitch_position_vert*100/vert_total;
 var pid = parseInt(key)+1;
 $(".team-b #p"+pid).css('top',vert_per+'%');
 $(".team-b #p"+pid).css('right',horiz_per+'%');


$('.team-b #p'+pid+ ' .photo-container img').attr("src","http://www.datasportsgroup.com/images/players/150x150/"+$scope.lineups[key].$.player_id+".png");
$('.team-b #p'+pid+ ' a').attr("href","player_details.html?p_id="+$scope.lineups[key].$.player_id);
$('.team-b #p'+pid+ ' .player-name').html($scope.lineups[key].$.matchname);



$('.team-b #p'+pid+ ' .player-details img').attr("src","http://www.datasportsgroup.com/images/players/150x150/"+$scope.lineups[key].$.player_id+".png");
$('.team-b #p'+pid+ ' .tt-player-name').html($scope.lineups[key].$.matchname);
$('.team-b #p'+pid+ ' .player-details .nationality').html('('+($scope.lineups[key].$.nationality).substring(0,3)+')');

}else{

 var pitch_position_horiz = array_s[0];
 var pitch_position_vert = array_s[1];

 var horiz_per = (pitch_position_horiz*100/horiz_total);
 var vert_per =  (pitch_position_vert*100/vert_total);
 var pid = key-10;
 $(".team-a #p"+pid).css('bottom',vert_per-4+'%');
 $(".team-a #p"+pid).css('left',horiz_per+'%');

 $('.team-a #p'+pid+ ' .photo-container img').attr("src","http://www.datasportsgroup.com/images/players/150x150/"+$scope.lineups[key].$.player_id+".png");
$('.team-a #p'+pid+ ' a').attr("href","player_details.html?p_id="+$scope.lineups[key].$.player_id);
$('.team-a #p'+pid+ ' .player-name').html($scope.lineups[key].$.matchname);

//for tooltip
$('.team-a #p'+pid+ ' .player-details img').attr("src","http://www.datasportsgroup.com/images/players/150x150/"+$scope.lineups[key].$.player_id+".png");
$('.team-a #p'+pid+ ' .tt-player-name').html($scope.lineups[key].$.matchname);
$('.team-a #p'+pid+ ' .player-details .nationality').html('('+($scope.lineups[key].$.nationality).substring(0,3)+')');




}




	
	


});


}





      try{
		                 $scope.lineups[key].card_count =0;
						 var card_tot=0;
						Object.keys($scope.bookings).forEach(function (key4)
			{
                       if(key4 == '$'){  if($scope.lineups[key].$.player_id == $scope.bookings[key4].player_id){
                              if($scope.bookings[key4].$.game_minute_extra){
                              $scope.lineups[key].$.y_cards = $scope.bookings[key4].game_minute+'+'+$scope.bookings[key4].game_minute_extra;
							   $scope.lineups[key].$.cards_type = $scope.bookings[key4].type;
                              }else{
                                    $scope.lineups[key].$.y_cards = $scope.bookings[key4].game_minute;
									  $scope.lineups[key].$.cards_type = $scope.bookings[key4].type;
                                    }

                             }
					   }else{
						
									if($scope.lineups[key].$.player_id == $scope.bookings[key4].$.player_id){
								        card_tot += 1;
										
                            if($scope.bookings[key4].$.type != 'yellow_card'){
                              $scope.lineups[key].card_count += 1;
							}
								
							     if(card_tot <= 1){
                              if($scope.bookings[key4].$.game_minute_extra){
                              $scope.lineups[key].$.y_cards = $scope.bookings[key4].$.game_minute+'+'+$scope.bookings[key4].$.game_minute_extra;
							  $scope.lineups[key].$.cards_type = $scope.bookings[key4].$.type;
                              }else{
                                    $scope.lineups[key].$.y_cards = $scope.bookings[key4].$.game_minute;
									$scope.lineups[key].$.cards_type = $scope.bookings[key4].$.type;
                                    }
							   }else if(card_tot == 2){
								      if($scope.bookings[key4].$.game_minute_extra){
                              $scope.lineups[key].$.cards_two = $scope.bookings[key4].$.game_minute+'+'+$scope.bookings[key4].$.game_minute_extra;
							  $scope.lineups[key].$.cards_two_type = $scope.bookings[key4].$.type;
                              }else{
                                   $scope.lineups[key].$.cards_two = $scope.bookings[key4].$.game_minute;
									$scope.lineups[key].$.cards_two_type = $scope.bookings[key4].$.type;
                                    }
							   }else {
								   if($scope.bookings[key4].$.game_minute_extra){
                             $scope.lineups[key].$.cards_three = $scope.bookings[key4].$.game_minute+'+'+$scope.bookings[key4].$.game_minute_extra;
							  $scope.lineups[key].$.cards_three_type = $scope.bookings[key4].$.type;
                              }else{
                                   $scope.lineups[key].$.cards_three = $scope.bookings[key4].$.game_minute;
									$scope.lineups[key].$.cards_three_type = $scope.bookings[key4].$.type;
                                    }
									}
                             }
					
					   }
                        }); }catch(e){}






                              $scope.lineups[key].goal_count =0;
							  var goal_tot=0;
							  var goal_count_tot=[];

                 if($scope.goals){				

                        Object.keys($scope.goals).forEach(function (key1)
			{
			
			           try{
			
                        if(key1 == '$'){
                             if($scope.lineups[key].$.player_id == $scope.goals[key1].player_id){

                             if($scope.goals[key1].game_minute_extra){
                             $scope.lineups[key].$.goals= $scope.goals[key1].game_minute+'+'+$scope.goals[key1].game_minute_extra;
							

                             }else{
                                     $scope.lineups[key].$.goals= $scope.goals[key1].game_minute;



                                     }
							$scope.lineups[key].$.goals_type= $scope.goals[key1].type;


									
                             }

                                   }else{
                         if($scope.lineups[key].$.player_id == $scope.goals[key1].$.player_id){
							
                               if($scope.goals[key1].$.type != 'own_goal'){
                              $scope.lineups[key].goal_count += 1;
							}
							
							
							
							
                              goal_tot += 1;
                            if(goal_tot <= 1){
								
								

							
								
                             if($scope.goals[key1].$.game_minute_extra){
                             $scope.lineups[key].$.goals= $scope.goals[key1].$.game_minute+'+'+$scope.goals[key1].$.game_minute_extra;
                        $scope.lineups[key].$.goals_type= $scope.goals[key1].$.type;
						
						
						
						
                             }else{
                                     $scope.lineups[key].$.goals= $scope.goals[key1].$.game_minute;
                             $scope.lineups[key].$.goals_type= $scope.goals[key1].$.type;

                                     }
							}
                              else if(goal_tot == 2){
                                         if($scope.goals[key1].$.game_minute_extra){
                                            $scope.lineups[key].$.goals_two= $scope.goals[key1].$.game_minute+'+'+$scope.goals[key1].$.game_minute_extra;
											  $scope.lineups[key].$.goals_type_two= $scope.goals[key1].$.type;

                                         }else{
                                                 $scope.lineups[key].$.goals_two= $scope.goals[key1].$.game_minute;
                                        $scope.lineups[key].$.goals_type_two= $scope.goals[key1].$.type;
                                              }



                                       }else  if(goal_tot == 3){
										
										    if($scope.goals[key1].$.game_minute_extra){
                                            $scope.lineups[key].$.goals_three= $scope.goals[key1].$.game_minute+'+'+$scope.goals[key1].$.game_minute_extra;
											  $scope.lineups[key].$.goals_type_three= $scope.goals[key1].$.type;

                                         }else{
                                                 $scope.lineups[key].$.goals_three= $scope.goals[key1].$.game_minute;
                                        $scope.lineups[key].$.goals_type_three= $scope.goals[key1].$.type;
                                              }

										
										
										
										
										
									   }else{
										
										      if($scope.goals[key1].$.game_minute_extra){
                                            $scope.lineups[key].$.goals_four= $scope.goals[key1].$.game_minute+'+'+$scope.goals[key1].$.game_minute_extra;
											  $scope.lineups[key].$.goals_type_four= $scope.goals[key1].$.type;

                                         }else{
                                                 $scope.lineups[key].$.goals_four= $scope.goals[key1].$.game_minute;
                                        $scope.lineups[key].$.goals_type_four= $scope.goals[key1].$.type;
                                              }

										
										
										
									   }
                             }

                              }
					   }catch(e){};

                     try{

                         Object.keys($scope.assists).forEach(function (key2)
			{
                         try{
                         if(key1 == '$'){
                           if($scope.goals[key1].event_id == $scope.assists[key2].related_event_id){
                          


                             $scope.lineups[key].$.assist_name= $scope.assists[key2].matchname;
                             if($scope.assists[key2].game_minute_extra){
                             $scope.lineups[key].$.assist_minute= $scope.assists[key2].game_minute+'+'+$scope.assists[key2].game_minute_extra;
                             }else{
                                 $scope.lineups[key].$.assist_minute= $scope.assists[key2].game_minute;
                                   }


                             }
                             }else{
                         if($scope.goals[key1].$.event_id == $scope.assists[key2].$.related_event_id){
                            

                             $scope.lineups[key].$.assist_name= $scope.assists[key2].$.matchname;
                             if($scope.assists[key2].$.game_minute_extra){
                             $scope.lineups[key].$.assist_minute= $scope.assists[key2].$.game_minute+'+'+$scope.assists[key2].$.game_minute_extra;
                             }else{
                                 $scope.lineups[key].$.assist_minute= $scope.assists[key2].$.game_minute;
                                   }


                             }
                             }
			}catch(e){};

                        });
						}catch(e){};

                        });

			}


                    try{      Object.keys($scope.substitutions).forEach(function (key3)
			{

                         if($scope.lineups[key].$.player_id == $scope.substitutions[key3].$.player_id){

                           
                              if($scope.substitutions[key3].$.game_minute_extra){
                              $scope.lineups[key].$.subs_out = $scope.substitutions[key3].$.game_minute+'+'+$scope.substitutions[key3].$.game_minute_extra;
                              }else{
                              $scope.lineups[key].$.subs_out = $scope.substitutions[key3].$.game_minute;
                             }

                             }


                        });



                           }catch(e){};


                       	     try{
					       Object.keys($scope.others).forEach(function (key3)
			        {
					if(key3 == '$'){
						if($scope.lineups[key].$.player_id == $scope.others[key3].player_id){
						$scope.lineups[key].$.other_event = $scope.others[key3].game_minute;
						$scope.lineups[key].$.other_event_type = $scope.others[key3].type;
						}
					}else{
						   if($scope.lineups[key].$.player_id == $scope.others[key3].$.player_id){
						$scope.lineups[key].$.other_event = $scope.others[key3].$.game_minute;
						$scope.lineups[key].$.other_event_type = $scope.others[key3].$.type;
						
						   }
					}
					});
					
					
				 }catch(e){}





                        });




 }else{$scope.player_pos = 'false';}




   try{
			$scope.team_stats = data.datasportsgroup.competition.season.rounds.match.team_stats;
			
			$scope.shots_total = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_total;
			$scope.shots_on_target = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_on_target;
			$scope.shots_off_target = data.datasportsgroup.competition.season.rounds.match.team_stats.shots_off_target;
			$scope.crosses = data.datasportsgroup.competition.season.rounds.match.team_stats.crosses;
			$scope.offsides = data.datasportsgroup.competition.season.rounds.match.team_stats.offsides;
			$scope.fouls = data.datasportsgroup.competition.season.rounds.match.team_stats.fouls;	
			$scope.saves = data.datasportsgroup.competition.season.rounds.match.team_stats.saves;	
				
			

		}catch(e){};	
				
			
			
			
			
			
			
			
			 $('#loader_outer').hide();
		
			
	
			

        }).error(function(data, status, headers, config) {
            
        });
		
		
		 


	 	    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
 
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	
  
	 
	 $scope.searched = function(c_area,v_com,v_for) {
	

	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
           
        });




	 
	
	
	})
	
	


.controller('qualification_detailsCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window, social) {
		




$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;

	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
	
	     $scope.cnt_id = (getParameterByName('cnt_id'));
         $scope.comp_id = (getParameterByName('comp_id'));
		 window.localStorage.setItem('compi_id',$scope.comp_id);

       
	     var seas_id;
		 $scope.cur_type_rnd ;

 $scope.qualification_fun=function(comp_id , season_id)	
 {
   
     if( season_id =='' || season_id == null)
   {


	      $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": $scope.comp_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
                              }).success(function(data, status, headers, config)
	                     	{
			
		                            $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id  = data.datasportsgroup.competition.season[0].$.season_id;
                             $scope.season_name  = data.datasportsgroup.competition.season[0].$.title;
							  window.localStorage.setItem('season_id', $scope.season_id);
                                           round();
						                 play_rank();
                           }else{
		
			             $scope.season_id  = data.datasportsgroup.competition.season.$.season_id;

                                     $scope.season_name = data.datasportsgroup.competition.season.$.title;						
			                   window.localStorage.setItem('season_id', $scope.season_id);
							             round();
						                 play_rank();
                              }
			
			
				                  $scope.comp_name = data.datasportsgroup.competition.$.name;
                                $scope.comps_id = data.datasportsgroup.competition.$.competition_id;
                                $scope.area_name = data.datasportsgroup.competition.$.area_name;
                                 $scope.area_id = data.datasportsgroup.competition.$.area_id;
			                 	
			

                             }).error(function(data, status, headers, config) {
                          
                          });

   }
 	
  else
 {    window.localStorage.setItem('season_id',season_id);
	

                              round();
						     play_rank();
 }	




function round()
{	

          $http({
		  method  : 'POST',
		url  : '/get_rounds',
                data : {"season_id": window.localStorage.getItem('season_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			
			
			
			
			
			
			                   $scope.rounds = data.datasportsgroup.competition.season.rounds;
							  	var arr_rd = Object.keys($scope.rounds).map(function(k) { return $scope.rounds[k] });
             $scope.len_rd = arr_rd.length;
			 if($scope.len_rd==1)
			 {
			arr_rd[0]=$scope.rounds;
          		
			 }
						  if($(window).width() < 765) {
							 
                            $scope.currentPage_rd =0;
                            $scope.pageSize_rd =3;
                            $scope.totalPages_rd =0;
                            $scope.pagedData_rd =[];
                            $scope.kk = $scope.len_rd -  $scope.pageSize_rd;
			

                         $scope.paginate_rd = function(nextPrevMultiplier_rd) {
    	                 $scope.currentPage_rd += (nextPrevMultiplier_rd * 1);
    	                 $scope.pagedData_rd = arr_rd.slice($scope.currentPage_rd);
		
		                   if(nextPrevMultiplier_rd==1)
						   {
							    $scope.kk = $scope.kk - 1;
						
						   }
						    if(nextPrevMultiplier_rd==-1)
						   {
							    $scope.kk = $scope.kk + 1;
					
						   }
                            }

  
	
							    $scope.rr_id;
							  $scope.crrt_wk;
							  $scope.rn_no;
							  var flg=0;
							  var chk=0;
							  var date2 = moment.utc();
	                          var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
							 
							  	  Object.keys($scope.rounds).forEach(function (key)
				                 {
					                if(key=='$')
									{
									
									 $scope.rr_id=$scope.rounds[key].round_id;
                                     $scope.crrt_wk=$scope.rounds[key].current_gameweek;
									  $scope.rn_no = (parseInt(key) + 1);
									  try{
									 if(Object.keys($scope.rounds[key].group).length < 1  ){
											
											
									
										if($scope.cur_rnd_typ == 'table'){
											
											$scope.cur_type_rnd = 'true';
										}
										}
										  }catch(e){$scope.cur_type_rnd = 'true';}
									  
									}
									else{
										
                                          if(($scope.rounds[key].$.start_date > date3) && (chk==0) && (flg == 0))
								    { 

								          var j;
								         if(key == 0)
										 {j = key;}
									      else{
							               j= parseInt(key)-1;}
										

									     $scope.rr_id = $scope.rounds[j].$.round_id ;
										  $scope.crrt_wk=$scope.rounds[j].$.current_gameweek;
							

										chk=1;
										

										  $scope.rn_no = (j + 1);
									}	
                                  else{							
                                    if( ($scope.rounds[key].$.end_date >= date3) && (flg==0) && (chk == 0))
									 {
										 $scope.rr_id = $scope.rounds[key].$.round_id ;
										  $scope.crrt_wk=$scope.rounds[key].$.current_gameweek;
										

                                         flg=1;
										

										   $scope.rn_no = (parseInt(key) + 1);
									 }else if(key == ($scope.len_rd -1) && (flg==0) && (chk==0))
									 {
										  $scope.rr_id = $scope.rounds[key].$.round_id;
										   $scope.crrt_wk=$scope.rounds[key].$.current_gameweek;
										

										

										    $scope.rn_no = (parseInt(key) + 1);
									 }										
								  }
										
									}
									
				                 });
				
				
							
								
 
								  window.localStorage.setItem('round_id',$scope.rr_id);
								  window.localStorage.setItem('current_week',$scope.crrt_wk);
								  window.localStorage.setItem('rnd_no',$scope.rn_no);
								


							 Object.keys($scope.rounds).forEach(function (key9)
				                 {
								  if(key9 != '$'){
								  		if(window.localStorage.getItem('round_id') == $scope.rounds[key9].$.round_id){
										$scope.cur_rnd_typ = $scope.rounds[key9].$.type;
									try{
										if(Object.keys($scope.rounds[key9].group).length < 1  ){
											
											
									
										if($scope.cur_rnd_typ == 'table'){
											
											$scope.cur_type_rnd = 'true';
										}
										}
										  }catch(e){$scope.cur_type_rnd = 'true';}
									}
								  }
								 });
                             		 	

                               setInterval(function(){
                         		  if($("li").hasClass('active'))
				                  {
					                 /
				                  }	
                                   else{
									

									     $("ul").find("[myid1='" + $scope.rr_id +"']").addClass('active');
										
								       }
  if($("li").hasClass('skactive'))
				                  {
					                
					

				                  }	
                                   else{
									

									   $("ul").find("[myid='" + $scope.crrt_wk +"']").addClass('skactive');
										
								       }

									   
							      }, 3000);
								
										
			                  $scope.get_rnd=function(ff,sr)
		                     { 
				                    $("ul").find("[myid1='" + ff +"']").addClass('active');
			                     
			                     	
				                   if($("li").hasClass('active'))
				                  {
					                $("li").removeClass('active');
					                $("ul").find("[myid1='" + ff +"']").addClass('active');
								  
				                  }
								 
							           window.localStorage.setItem('round_id',ff);
									   
									 
									   window.localStorage.setItem('current_week',sr);
									 
                   				    get_mat_round( window.localStorage.getItem('round_id'),window.localStorage.getItem('current_week'));
									  league_table();

									if($scope.cur_type_rnd){get_tbl();}
		                     }				
							
							    function init_rd() {
	                          $scope.totalPages_rd = Math.ceil($scope.len_rd/$scope.pageSize_rd);
	                         $scope.pagedData_rd = arr_rd;
	                        if($scope.rn_no > 2)
	                      	{
                             for(var i=0 ; i<($scope.rn_no - 1); i++)
                                     {	
                               $scope.paginate_rd(1);
                                   }
			
		                    }			
		                    
						 $scope.get_rnd($scope.rr_id,$scope.crrt_wk);	
                        }

                          init_rd();							 
		 
				
	
                                 }
                         else{
	
                      
			                $scope.currentPage_rd =0;
                            $scope.pageSize_rd =6;
                            $scope.totalPages_rd =0;
                            $scope.pagedData_rd =[];
                            $scope.kk = $scope.len_rd -  $scope.pageSize_rd;
			

                         $scope.paginate_rd = function(nextPrevMultiplier_rd) {
    	                 $scope.currentPage_rd += (nextPrevMultiplier_rd * 1);
    	                 $scope.pagedData_rd = arr_rd.slice($scope.currentPage_rd);
		
		                   if(nextPrevMultiplier_rd==1)
						   {
							    $scope.kk = $scope.kk - 1;
						
						   }
						    if(nextPrevMultiplier_rd==-1)
						   {
							    $scope.kk = $scope.kk + 1;
					
						   }
                            }

  
	
							    $scope.rr_id;
							  $scope.crrt_wk;
							  $scope.rn_no;
							  var flg=0;
							  var chk=0;
							  var date2 = moment.utc();
	                          var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
							  
							  	  Object.keys($scope.rounds).forEach(function (key)
				                 {
					                if(key=='$')
									{
									
									 $scope.rr_id=$scope.rounds[key].round_id;
                                     $scope.crrt_wk=$scope.rounds[key].current_gameweek;
									  $scope.rn_no = (parseInt(key) + 1);
									  try{
									  if(Object.keys($scope.rounds[key].group).length < 1  ){
											
											
									
										if($scope.cur_rnd_typ == 'table'){
											
											$scope.cur_type_rnd = 'true';
										}
										}
									  }catch(e){$scope.cur_type_rnd = 'true';}
									}
									else{
										
                                          if(($scope.rounds[key].$.start_date > date3) && (chk==0) && (flg == 0))
								    {
;
								          var j;
								         if(key == 0)
										 {j = key;}
									      else{
							               j= parseInt(key)-1;}
										

									     $scope.rr_id = $scope.rounds[j].$.round_id ;
										  $scope.crrt_wk=$scope.rounds[j].$.current_gameweek;
							

										chk=1;
										

										  $scope.rn_no = (j + 1);
									}	
                                  else{							
                                    if( ($scope.rounds[key].$.end_date >= date3) && (flg==0) && (chk == 0))
									 {
										 $scope.rr_id = $scope.rounds[key].$.round_id ;
										  $scope.crrt_wk=$scope.rounds[key].$.current_gameweek;
										

                                         flg=1;
										

										   $scope.rn_no = (parseInt(key) + 1);
									 }else if(key == ($scope.len_rd -1) && (flg==0) && (chk==0))
									 {
										  $scope.rr_id = $scope.rounds[key].$.round_id;
										   $scope.crrt_wk=$scope.rounds[key].$.current_gameweek;
										

										

										    $scope.rn_no = (parseInt(key) + 1);
									 }										
								  }
										
									}
									
									
							
				                 });
				
				
							
								

								  window.localStorage.setItem('round_id',$scope.rr_id);
								  window.localStorage.setItem('current_week',$scope.crrt_wk);
								  window.localStorage.setItem('rnd_no',$scope.rn_no);
								  
									 Object.keys($scope.rounds).forEach(function (key9)
				                 {
								  if(key9 != '$'){
								  		if(window.localStorage.getItem('round_id') == $scope.rounds[key9].$.round_id){
										$scope.cur_rnd_typ = $scope.rounds[key9].$.type;
									try{
										if(Object.keys($scope.rounds[key9].group).length < 1  ){
											
											
									
										if($scope.cur_rnd_typ == 'table'){
											
											$scope.cur_type_rnd = 'true';
										}
										}
										  }catch(e){$scope.cur_type_rnd = 'true';}
									}
								  }
								 });
								  
                             		 	

                               setInterval(function(){
                         		  if($("li").hasClass('active'))
				                  {
					                 
				                  }	
                                   else{
									

									     $("ul").find("[myid1='" + $scope.rr_id +"']").addClass('active');
										
								       }
  if($("li").hasClass('skactive'))
				                  {
					                
					

				                  }	
                                   else{
									

									   $("ul").find("[myid='" + $scope.crrt_wk +"']").addClass('skactive');
										
								       }

									   
							      }, 3000);
								
										
			                  $scope.get_rnd=function(ff,sr)
		                     {
			
			                 
				                    $("ul").find("[myid1='" + ff +"']").addClass('active');
			                    
			                     	
				                   if($("li").hasClass('active'))
				                  {
					                $("li").removeClass('active');
					                $("ul").find("[myid1='" + ff +"']").addClass('active');
								  
				                  }
								 
							           window.localStorage.setItem('round_id',ff);
									 
									   window.localStorage.setItem('current_week',sr);
									 
                   				    get_mat_round( window.localStorage.getItem('round_id'),window.localStorage.getItem('current_week'));	
									  league_table();
									  if($scope.cur_type_rnd){get_tbl();}
									  
		                     }				
							
							    function init_rd() {
	                          $scope.totalPages_rd = Math.ceil($scope.len_rd/$scope.pageSize_rd);
	                         $scope.pagedData_rd = arr_rd;
	                        if($scope.rn_no > 4)
	                      	{
                             for(var i=0 ; i<($scope.rn_no - 4); i++)
                                     {	
                               $scope.paginate_rd(1);
                                   }
			
		                    }			
		                    
							
						 $scope.get_rnd($scope.rr_id,$scope.crrt_wk);	
                        }

                          init_rd();
						 }
                             }).error(function(data, status, headers, config) {
                        
							window.location='error_page.html'
                          });

			
}

			


			
			




  if(window.localStorage.getItem('round_id') != undefined && window.localStorage.getItem('current_week') != undefined)
  {
	


  }
  else{
	
     }

	
 function get_mat_round(rdsk,wkwkk)
{	

$scope.show_logo4 = 'true';
		  $('#loader_outer1').show();



  	$http({
			 		            				
                method  : 'POST',
		url  : '/get_matches',
                data : {"type": "round","id":window.localStorage.getItem('round_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			


                                        var chk;
                                       $scope.tl_match='';
									    $scope.matches;
									      $scope.matches1 = data.datasportsgroup.competition.season.rounds;
										
							  Object.keys($scope.matches1).forEach(function (key)
							  	{
								  if(key=='group')
								  {
									    $scope.matches = data.datasportsgroup.competition.season.rounds[key][0].match;
										  chk=2;
								  }
								   if(key=='match')
								  {
									   $scope.matches = data.datasportsgroup.competition.season.rounds[key];
									     chk=2;
								  }
								   if(key=='playoff')
								  {
									  $scope.matches = data.datasportsgroup.competition.season.rounds;
								

								   chk=undefined;
								  }

						    	});	
						
							
						
						
							
							
							 if(chk==2)
							 {
								
							   var al = Object.keys($scope.matches).length;
						
							   var dte_arr=[];
							   if(al==1)
							   {
								  	dte_arr[0]= data.datasportsgroup.competition.season.rounds;
									 $scope.tl_match=dte_arr;
							   }
			                   else{
								 $scope.tl_match = $scope.matches;
							   }
							
							   at=[];
							   sk={}
							   var l =$scope.tl_match[al-1].$.gameweek;
							
							   for(i=0;i<l;i++)
							   {
								   at[i]=i+1;
								   sk[i]=at[i];
							   }
							   $scope.gameweek=sk;
							
							
							var arr11 = Object.keys($scope.gameweek).map(function(k) { return $scope.gameweek[k] });
			
			
			
           $scope.len11 = arr11.length;
		
	
						  if (($(window).width() < 765) && (window.localStorage.getItem('current_week') != undefined)) {
							
				 $scope.currentPage11 = 0;
               $scope.pageSize11 = 3;
               $scope.totalPages11 = 0;
               $scope.pagedData11 = [];
               $scope.dk=$scope.len11 -  $scope.pageSize11;
			
			

			
    $scope.paginate11 = function(nextPrevMultiplier11) {
    	$scope.currentPage11 += (nextPrevMultiplier11 * 1);
    	$scope.pagedData11 = arr11.slice($scope.currentPage11);
		

	  if(nextPrevMultiplier11==1)
						   {
							    $scope.dk = $scope.dk - 1;
								

						   }
						    if(nextPrevMultiplier11==-1)
						   {
							    $scope.dk = $scope.dk + 1;
								

						   }
	
    }

    function init11() {
		
	    $scope.totalPages11 = Math.ceil($scope.len11/$scope.pageSize11);
	    $scope.pagedData11 = arr11;
	                       if(window.localStorage.getItem('current_week') > 2 )
	                      	{
							 
                             for(var i=0 ; i<(window.localStorage.getItem('current_week') - 2); i++)
                                    {	
                               $scope.paginate11(1);
                                     }
			
		                    }			
	
	$scope.get_week(wks);
	

    }
	  setInterval(function(){
                         	
  if($("li").hasClass('skactive'))
				                  {
					              
				                  }	
                                   else{
									

									   $("ul").find("[myid='" + wks +"']").addClass('skactive');
										
								       }

									   
							      }, 3000);
var wks= ' ';
	wks = window.localStorage.getItem('current_week');
		$scope.get_week=function(wk)
	{       wks=wk;
		

     $("ul").find("[myid='" + wk +"']").addClass('skactive');

				
				
     if($("li").hasClass('skactive'))
	{  $("li").removeClass('skactive');
       $("ul").find("[myid='" + wk +"']").addClass('skactive');
	

	}
	 get_match(wks);	
	}	
		
	
	
	
	
	
	
    init11();					  
		 
				
	
              }
						
           else{
	           $scope.currentPage11 = 0;
               $scope.pageSize11 = 9;
               $scope.totalPages11 = 0;
               $scope.pagedData11 = [];
               $scope.dk=$scope.len11 -  $scope.pageSize11;
			
			

			
    $scope.paginate11 = function(nextPrevMultiplier11) {
    	$scope.currentPage11 += (nextPrevMultiplier11 * 1);
    	$scope.pagedData11 = arr11.slice($scope.currentPage11);
		

	  if(nextPrevMultiplier11==1)
						   {
							    $scope.dk = $scope.dk - 1;
								

						   }
						    if(nextPrevMultiplier11==-1)
						   {
							    $scope.dk = $scope.dk + 1;
								

						   }
	
    }

    function init11() {
	    $scope.totalPages11 = Math.ceil($scope.len11/$scope.pageSize11);
	    $scope.pagedData11 = arr11;
	  if($scope.crrt_wk > 4 & $scope.crrt_wk < 8)
	                      	{
                             for(var i=0 ; i<($scope.crrt_wk - 4); i++)
                                     {	
                                $scope.paginate11(1);
                                     }
			
		                    }			
	
	$scope.get_week(wks);
	

    }
	  setInterval(function(){
                         	
  if($("li").hasClass('skactive'))
				                  {
					             
				                  }	
                                   else{
									

									   $("ul").find("[myid='" + wks +"']").addClass('skactive');
										
								       }

									   
							      }, 3000);
var wks= ' ';
	wks = window.localStorage.getItem('current_week');
		$scope.get_week=function(wk)
	{       wks=wk;
		

     $("ul").find("[myid='" + wk +"']").addClass('skactive');

				
				
     if($("li").hasClass('skactive'))
	{  $("li").removeClass('skactive');
       $("ul").find("[myid='" + wk +"']").addClass('skactive');
	

	}
	 get_match(wks);	
	}	
		
	
	
	
	
	
	
    init11();
}
							 }
								


	
	


get_match(wks);

	function get_match(wks)
{	
	

  $scope.flag;					
 $scope.mat = data.datasportsgroup.competition.season.rounds;


ww=[];

var mat_type;

Object.keys($scope.mat).forEach(function (key)
			{
	
							 if(key=='group')
							 {
					
								
								Object.keys($scope.mat[key]).forEach(function (key1)
							 	{
								  Object.keys($scope.mat[key][key1].match).forEach(function (key2)
								  {
									   if($scope.mat[key][key1].match[key2].$.gameweek==wks)
									   {

										
											
                                                  ww.push({group_name: $scope.mat[key][key1].$.name, match: $scope.mat[key][key1].match[key2] });
											
									   }
                                         										
								  });                             		


									
								});			
								
$scope.flag=1;

								
							 }
			
							 if(key=='match')
							 {
						

								Object.keys($scope.mat[key]).forEach(function (key3)
							 	{
									if(key3=='$')
									{
									 ww.push({mat: $scope.mat[key]});
                                       $scope.flag=2;										
									}
									else
									{
										

										
								  if(($scope.mat[key][key3].$.gameweek==wks ) && (wks !=''))
								  {

									  ww.push($scope.mat[key][key3]);
                                       $scope.flag=0;									
								  }
								   if($scope.mat[key][key3].$.gameweek == '')
								  {

									  ww.push({mat: $scope.mat[key][key3]});
                                       $scope.flag=2;									
								  } 							
				
									}
									
								});					
							
							 }	

                   
					
                                if(key=='playoff')
							 {    mat_type = 'playoff';
						            
								Object.keys($scope.mat[key]).forEach(function (key4)
							 	{
							       	

								 if(key4 == 'match')
								 {
								  Object.keys($scope.mat[key][key4]).forEach(function(key5)
								 {  alert("simple");
									  ww.push($scope.mat[key][key4][key5]);
									


								 });
								 }
								 if(key4 == '$')
								 {
									

								 }
								 else{
								try{	
							      Object.keys($scope.mat[key][key4].match).forEach(function(key5)
								 {     
									  ww.push($scope.mat[key][key4].match[key5]);
								 });
								}catch(e)
								{
									 if(key4 == '$')
								 {
									

								 }
								}
								 }
									
								});					
							
$scope.flag=2;							
						      }	 					
					
					
              if(wks == ' '|| wks=='null')
					  {				
							  if(key=='$')
							 {
											
						$scope.flag=2;							
							
							}	
					  }
			
			});
			
	
	
if(mat_type == 'playoff')
{
$scope.arr=ww;
 sk_arr=[];
 sk_arr12=[];
 var e= ww.length;



 Object.keys($scope.arr).forEach(function(key)
{
	sk_arr.push({ date: $scope.arr[key].$.date , mat: $scope.arr[key] });
});


$scope.arr12=sk_arr;
var sw;
  Object.keys($scope.arr12).forEach(function(key1)
{
	 Object.keys($scope.arr12).forEach(function(key2)
  {
	  if(key2 >0)
	  {
 		if( $scope.arr12[key1].date < $scope.arr12[key2].date)
		{
			 sw = $scope.arr12[key2];
			($scope.arr12[key2]) = ($scope.arr12[key1]);
            ($scope.arr12[key1]) = (sw);
			
            			
		}
	  }
  });
	

	
});
 $scope.dd=$scope.arr12;

kk=[];
 Object.keys($scope.dd).forEach(function(key)
 {       var ll=parseInt(key) + 1;
		 kk.push($scope.dd[ll]);
		
		
 });
 kk[e-1] =$scope.dd[0];




ag=[];
ag1=[];
if( kk.length == ww.length)
{

$scope.aggr = kk;
Object.keys($scope.aggr).forEach(function(key)
{
  date=$scope.aggr[key].date;
	   ta = $scope.aggr[key].mat.$.team_a_id;
       tb = $scope.aggr[key].mat.$.team_b_id;
	   sa =  $scope.aggr[key].mat.$.score_a;
	   sb =  $scope.aggr[key].mat.$.score_b;
	


 Object.keys($scope.aggr).forEach(function(key4)
{  var k1 = (parseInt(key));
   var k4 = parseInt(key4);


   if( (k1 <= k4) )
   {
	
	   if( ($scope.aggr[k4].mat.$.team_a_id == tb) && ($scope.aggr[k4].mat.$.team_b_id == ta) )			
		 {
	        if($scope.aggr[k4].mat.$.score_a != '' &&  $scope.aggr[k4].mat.$.score_b != ''){
				

    		  var agre= (parseInt(sb) + parseInt($scope.aggr[k4].mat.$.score_a)) +" - " + (parseInt(sa) + parseInt($scope.aggr[k4].mat.$.score_b));


			}else if(sa != '' &&  sb != '')
			{  var agre= (sb) +" - " + (sa);
				

			}
			else{
				  var agre= '';
			     }
			  ag1.push( {date: $scope.aggr[k4].date, mat:$scope.aggr[k4].mat , agre :agre});
	        		
		 }
	        else if(( k4 == k1) ) {
			 var agre = '';

			 ag.push( {date: $scope.aggr[k1].date , mat:$scope.aggr[k1].mat , agre :agre});
		 }
   }

});

	
});
}


$scope.ag_final=ag;
$scope.ag1_final=ag1;





var arg_lst=[];
 Object.keys($scope.ag_final).forEach(function(key1)
{
	 Object.keys($scope.ag1_final).forEach(function(key2)
  {
	
		  if(($scope.ag_final[key1].date == $scope.ag1_final[key2].date) && (($scope.ag_final[key1].team_a_id == $scope.ag1_final[key2].team_a_id) && ($scope.ag_final[key1].team_b_id == $scope.ag1_final[key2].team_b_id)) && ($scope.ag_final[key1].mat.$.match_id == $scope.ag1_final[key2].mat.$.match_id) )
	   {  
          $scope.ag_final[key1].agre = $scope.ag1_final[key2].agre;  			
	   }
		
		
		
  });
	

	
});




arg_lst=$scope.ag_final;

 if(arg_lst.length == ww.length)
 {
  $scope.arrk1=arg_lst;
 sk_arrk1=[];
 sk_arr12k1=[];
 ek1=arg_lst.length;

 

var swk1;
  Object.keys($scope.arrk1).forEach(function(key1)
{
	 Object.keys($scope.arrk1).forEach(function(key2)
  {
	  if(key2 > 0)
 	  {
 		if( $scope.arrk1[key1].date < $scope.arrk1[key2].date)
		{


			 swk1 = $scope.arrk1[key2];
           
			($scope.arrk1[key2]) = ($scope.arrk1[key1]);
            ($scope.arrk1[key1]) = (swk1);
			
            			
		}
	  }
  });
	

	
});
 $scope.ddk1=$scope.arrk1;

 
kkk1=[];
 Object.keys($scope.ddk1).forEach(function(key)
 {       var llk1=parseInt(key) + 1;
		 kkk1.push($scope.ddk1[llk1]);
		

		
 });
 kkk1[ek1-1] =$scope.ddk1[0];












 }

 



	

$scope.sk_match= kkk1;

}else{
     $scope.sk_match= ww;
	
}




 if(($scope.sk_match == 0 ))
{ $scope.msg1 = 0;	
 $scope.flag=2;


}
else{
	   $scope.msg1 = 1;
  $scope.flag=$scope.flag;	
   }	


	}
        	$scope.show_logo4 = 'false';
		  $('#loader_outer1').hide();

							}).error(function(data, status, headers, config) {
                            
                          }); 					
						
}	



 function get_mat_round1(rdsk,wkwkk)
{	





  	$http({
			 		            				
                method  : 'POST',
		url  : '/get_matches',
                data : {"type": "round","id":window.localStorage.getItem('round_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			


                                        var chk;
                                       $scope.tl_match='';
									    $scope.matches;
									      $scope.matches1 = data.datasportsgroup.competition.season.rounds;
										
							  Object.keys($scope.matches1).forEach(function (key)
							  	{
								  if(key=='group')
								  {
									    $scope.matches = data.datasportsgroup.competition.season.rounds[key][0].match;
										  chk=2;
								  }
								   if(key=='match')
								  {
									   $scope.matches = data.datasportsgroup.competition.season.rounds[key];
									     chk=2;
								  }
								   if(key=='playoff')
								  {
									  $scope.matches = data.datasportsgroup.competition.season.rounds;
								

								   chk=undefined;
								  }

						    	});	
						
							
						
						
							
							
							 if(chk==2)
							 {
								
							   var al = Object.keys($scope.matches).length;
						
							   var dte_arr=[];
							   if(al==1)
							   {
								  	dte_arr[0]= data.datasportsgroup.competition.season.rounds;
									 $scope.tl_match=dte_arr;
							   }
			                   else{
								 $scope.tl_match = $scope.matches;
							   }
							
							   at=[];
							   sk={}
							   var l =$scope.tl_match[al-1].$.gameweek;
							
							   for(i=0;i<l;i++)
							   {
								   at[i]=i+1;
								   sk[i]=at[i];
							   }
							   $scope.gameweek=sk;
							
							
							var arr11 = Object.keys($scope.gameweek).map(function(k) { return $scope.gameweek[k] });
			
			
			
           $scope.len11 = arr11.length;
		
	
						  if (($(window).width() < 765) && (window.localStorage.getItem('current_week') != undefined)) {
							 
				 $scope.currentPage11 = 0;
               $scope.pageSize11 = 3;
               $scope.totalPages11 = 0;
               $scope.pagedData11 = [];
               $scope.dk=$scope.len11 -  $scope.pageSize11;
			
			

			
    $scope.paginate11 = function(nextPrevMultiplier11) {
    	$scope.currentPage11 += (nextPrevMultiplier11 * 1);
    	$scope.pagedData11 = arr11.slice($scope.currentPage11);
		

	  if(nextPrevMultiplier11==1)
						   {
							    $scope.dk = $scope.dk - 1;
								

						   }
						    if(nextPrevMultiplier11==-1)
						   {
							    $scope.dk = $scope.dk + 1;
								

					   }
	
    }

    function init11() {
		
	    $scope.totalPages11 = Math.ceil($scope.len11/$scope.pageSize11);
	    $scope.pagedData11 = arr11;
	                       if(window.localStorage.getItem('current_week') > 2 )
	                      	{
							 
                             for(var i=0 ; i<(window.localStorage.getItem('current_week') - 2); i++)
                                    {	
                               $scope.paginate11(1);
                                     }
			
		                    }			
	
	$scope.get_week(wks);
	

    }
	  setInterval(function(){
                         	
  if($("li").hasClass('skactive'))
				                  {
					              
				                  }	
                                   else{
									

									   $("ul").find("[myid='" + wks +"']").addClass('skactive');
										
								       }

									   
							      }, 3000);
var wks= ' ';
	wks = window.localStorage.getItem('current_week');
		$scope.get_week=function(wk)
	{       wks=wk;
		

     $("ul").find("[myid='" + wk +"']").addClass('skactive');

				
				
     if($("li").hasClass('skactive'))
	{  $("li").removeClass('skactive');
       $("ul").find("[myid='" + wk +"']").addClass('skactive');
	

	}
	 get_match(wks);	
	}	
		
	
	
	
	
	
	
    init11();					  
		 
				
	
              }
						
           else{
	           $scope.currentPage11 = 0;
               $scope.pageSize11 = 9;
               $scope.totalPages11 = 0;
               $scope.pagedData11 = [];
               $scope.dk=$scope.len11 -  $scope.pageSize11;
			
			

			
    $scope.paginate11 = function(nextPrevMultiplier11) {
    	$scope.currentPage11 += (nextPrevMultiplier11 * 1);
    	$scope.pagedData11 = arr11.slice($scope.currentPage11);
		

	  if(nextPrevMultiplier11==1)
						   {
							    $scope.dk = $scope.dk - 1;
								

						   }
						    if(nextPrevMultiplier11==-1)
						   {
							    $scope.dk = $scope.dk + 1;
								

						   }
	
    }

    function init11() {
	    $scope.totalPages11 = Math.ceil($scope.len11/$scope.pageSize11);
	    $scope.pagedData11 = arr11;
	  if($scope.crrt_wk > 4 & $scope.crrt_wk < 8)
	                      	{
                             for(var i=0 ; i<($scope.crrt_wk - 4); i++)
                                     {	
                                $scope.paginate11(1);
                                     }
			
		                    }			
	
	$scope.get_week(wks);
	

    }
	  setInterval(function(){
                         	
  if($("li").hasClass('skactive'))
				                  {
					              
				                  }	
                                   else{
									

									   $("ul").find("[myid='" + wks +"']").addClass('skactive');
										
								       }

									   
							      }, 3000);
var wks= ' ';
	wks = window.localStorage.getItem('current_week');
		$scope.get_week=function(wk)
	{       wks=wk;
		

     $("ul").find("[myid='" + wk +"']").addClass('skactive');

				
				
     if($("li").hasClass('skactive'))
	{  $("li").removeClass('skactive');
       $("ul").find("[myid='" + wk +"']").addClass('skactive');
	

	}
	 get_match(wks);	
	}	
		
	
	
	
	
	
	
    init11();
}
							 }
								


	
	


get_match(wks);

	function get_match(wks)
{	
	

  $scope.flag;					
 $scope.mat = data.datasportsgroup.competition.season.rounds;


ww=[];

var mat_type;

Object.keys($scope.mat).forEach(function (key)
			{
	
							 if(key=='group')
							 {
					
								
								Object.keys($scope.mat[key]).forEach(function (key1)
							 	{
								  Object.keys($scope.mat[key][key1].match).forEach(function (key2)
								  {
									   if($scope.mat[key][key1].match[key2].$.gameweek==wks)
									   {

										
											
                                                  ww.push({group_name: $scope.mat[key][key1].$.name, match: $scope.mat[key][key1].match[key2] });
											
									   }
                                         										
								  });                             		


									
								});			
								
$scope.flag=1;

								
							 }
			
							 if(key=='match')
							 {
						

								Object.keys($scope.mat[key]).forEach(function (key3)
							 	{
									if(key3=='$')
									{
									 ww.push({mat: $scope.mat[key]});
                                       $scope.flag=2;										
									}
									else
									{
										
;
										
								  if(($scope.mat[key][key3].$.gameweek==wks ) && (wks !=''))
								  {

									  ww.push($scope.mat[key][key3]);
                                       $scope.flag=0;									
								  }
								   if($scope.mat[key][key3].$.gameweek == '')
								  {

									  ww.push({mat: $scope.mat[key][key3]});
                                       $scope.flag=2;									
								  } 							
				
									}
									
								});					
							
							 }	

                   
					
                                if(key=='playoff')
							 {    mat_type = 'playoff';
						           
								Object.keys($scope.mat[key]).forEach(function (key4)
							 	{
							       	

								 if(key4 == 'match')
								 {
								  Object.keys($scope.mat[key][key4]).forEach(function(key5)
								 {  alert("simple");
									  ww.push($scope.mat[key][key4][key5]);
									


								 });
								 }
								 if(key4 == '$')
								 {
									

								 }
								 else{
								try{	
							      Object.keys($scope.mat[key][key4].match).forEach(function(key5)
								 {     //alert("try");
									  ww.push($scope.mat[key][key4].match[key5]);
								 });
								}catch(e)
								{
									 if(key4 == '$')
								 {

								 }
								}
								 }
									
								});					
							
$scope.flag=2;							
						      }	 					
					
					
              if(wks == ' '|| wks=='null')
					  {				
							  if(key=='$')
							 {
											
						$scope.flag=2;							
							
							}	
					  }
			
			});
			
	
	
if(mat_type == 'playoff')
{
$scope.arr=ww;
 sk_arr=[];
 sk_arr12=[];
 var e= ww.length;



 Object.keys($scope.arr).forEach(function(key)
{
	sk_arr.push({ date: $scope.arr[key].$.date , mat: $scope.arr[key] });
});


$scope.arr12=sk_arr;
var sw;
  Object.keys($scope.arr12).forEach(function(key1)
{
	 Object.keys($scope.arr12).forEach(function(key2)
  {
	  if(key2 >0)
	  {
 		if( $scope.arr12[key1].date < $scope.arr12[key2].date)
		{
			 sw = $scope.arr12[key2];
			($scope.arr12[key2]) = ($scope.arr12[key1]);
            ($scope.arr12[key1]) = (sw);
			
            			
		}
	  }
  });
	

	
});
 $scope.dd=$scope.arr12;
kk=[];
 Object.keys($scope.dd).forEach(function(key)
 {       var ll=parseInt(key) + 1;
		 kk.push($scope.dd[ll]);
		
		
 });
 kk[e-1] =$scope.dd[0];




ag=[];
ag1=[];
if( kk.length == ww.length)
{

$scope.aggr = kk;
Object.keys($scope.aggr).forEach(function(key)
{
  date=$scope.aggr[key].date;
	   ta = $scope.aggr[key].mat.$.team_a_id;
       tb = $scope.aggr[key].mat.$.team_b_id;
	   sa =  $scope.aggr[key].mat.$.score_a;
	   sb =  $scope.aggr[key].mat.$.score_b;
	


 Object.keys($scope.aggr).forEach(function(key4)
{  var k1 = (parseInt(key));
   var k4 = parseInt(key4);


   if( (k1 <= k4) )
   {
	
	   if( ($scope.aggr[k4].mat.$.team_a_id == tb) && ($scope.aggr[k4].mat.$.team_b_id == ta) )			
		 {
	        if($scope.aggr[k4].mat.$.score_a != '' &&  $scope.aggr[k4].mat.$.score_b != ''){
				

    		  var agre= (parseInt(sb) + parseInt($scope.aggr[k4].mat.$.score_a)) +" - " + (parseInt(sa) + parseInt($scope.aggr[k4].mat.$.score_b));


			}else if(sa != '' &&  sb != '')
			{  var agre= (sb) +" - " + (sa);
				

			}
			else{
				  var agre= '';
			     }
			  ag1.push( {date: $scope.aggr[k4].date, mat:$scope.aggr[k4].mat , agre :agre});
	        		
		 }
	        else if(( k4 == k1) ) {
			 var agre = '';

			 ag.push( {date: $scope.aggr[k1].date , mat:$scope.aggr[k1].mat , agre :agre});
		 }
   }

});

	
});
}


$scope.ag_final=ag;
$scope.ag1_final=ag1;


var arg_lst=[];
 Object.keys($scope.ag_final).forEach(function(key1)
{
	 Object.keys($scope.ag1_final).forEach(function(key2)
  {
	
		  if(($scope.ag_final[key1].date == $scope.ag1_final[key2].date) && (($scope.ag_final[key1].team_a_id == $scope.ag1_final[key2].team_a_id) && ($scope.ag_final[key1].team_b_id == $scope.ag1_final[key2].team_b_id)) && ($scope.ag_final[key1].mat.$.match_id == $scope.ag1_final[key2].mat.$.match_id) )
	   {  
          $scope.ag_final[key1].agre = $scope.ag1_final[key2].agre;  			
	   }
		
		
		
  });
	

	
});




arg_lst=$scope.ag_final;
 
 if(arg_lst.length == ww.length)
 {
  $scope.arrk1=arg_lst;
 sk_arrk1=[];
 sk_arr12k1=[];
 ek1=arg_lst.length;



var swk1;
  Object.keys($scope.arrk1).forEach(function(key1)
{
	 Object.keys($scope.arrk1).forEach(function(key2)
  {
	  if(key2 > 0)
 	  {
 		if( $scope.arrk1[key1].date < $scope.arrk1[key2].date)
		{


			 swk1 = $scope.arrk1[key2];
          
			($scope.arrk1[key2]) = ($scope.arrk1[key1]);
            ($scope.arrk1[key1]) = (swk1);
			
            			
		}
	  }
  });
	

	
});
 $scope.ddk1=$scope.arrk1;

 
kkk1=[];
 Object.keys($scope.ddk1).forEach(function(key)
 {       var llk1=parseInt(key) + 1;
		 kkk1.push($scope.ddk1[llk1]);
		

		
 });
 kkk1[ek1-1] =$scope.ddk1[0];












 }

 



	

$scope.sk_match= kkk1;

}else{
     $scope.sk_match= ww;
	
}

 if(($scope.sk_match == 0 ))
{ $scope.msg1 = 0;	
 $scope.flag=2;


}
else{
	   $scope.msg1 = 1;
  $scope.flag=$scope.flag;	
   }	


	}
        	$scope.show_logo4 = 'false';
		  $('#loader_outer1').hide();

							}).error(function(data, status, headers, config) {
                            
                          }); 					
						
}			
window.setInterval(function(){		

 get_mat_round1( window.localStorage.getItem('round_id'),window.localStorage.getItem('current_week'));


	     
              }, 60000);
								

		     $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
            
        });
		

          }



  $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		
       
		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };






function league_table()
	{
  

     $scope.tbl=[];
	
	 $scope.tbl_match=[];
     $scope.tbl_name=[];
	 var save_tid=[];
  					
 $http({
			
          method  : 'POST',
		url  : '/get_tables',
                 data : {"type": "round","id": window.localStorage.getItem('round_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
                              }).success(function(data, status, headers, config)
	                     	{
			

			
			                 try{
			                   $scope.groups = data.datasportsgroup.competition.season.rounds.group;
							   $scope.season_id1 = data.datasportsgroup.competition.season.$.season_id;
			                 }catch(e){$scope.groups = '';}
							
							
							  if($scope.groups){
                               		var arrg = Object.keys($scope.groups).map(function(k) { return $scope.groups[k] });
			                        var len = arrg.length;
								
								Object.keys($scope.groups).forEach(function(key){
									
									 $scope.tbl[key]=$scope.groups[key].total.table;
									
								    $scope.tbl_name[key]=$scope.groups[key].$.name;
								


							  Object.keys( $scope.tbl[key]).forEach(function(key1){
								
                         var array3 = [];

          $http({
            	method  : 'POST',
		url  : '/get_team',
                data : {"team": $scope.tbl[key][key1].$.team_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
		
					$scope.last_match = data.datasportsgroup.team.last_matches.match;
					
					
				
							  Object.keys($scope.last_match).forEach(function (key2)
			{
			      var iterator = (((Object.keys($scope.last_match)).length))-(parseInt(key2));
			       if(array3.length >= 0 && array3.length <= 6  ){
					
			         if($scope.last_match[(parseInt(iterator))-1].$.season_id == $scope.season_id1)
					 {
						
							    array3.push($scope.last_match[((parseInt(iterator))-1)]);
						
						
					 }
				   }
			
			});
			
				  $scope.tbl_match[key1] = array3;
				
				
			
	
			
		
		
		}).error(function(data, status, headers, config) {
                           
                          }); 	


	});

	
	  $scope.tbl[key].match = $scope.tbl_match;
	  	
								});
								
							
							  }
							
							
							
							
			
                             }).error(function(data, status, headers, config) {
                           
                          });
	  			

 }
 
 function get_tbl(){
	 
	
	 
	 		         $http({

          method  : 'POST',
		url  : '/get_tables',
                 data : {"type": "round","id": window.localStorage.getItem('round_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
                          },
			
        }).success(function(data, status, headers, config)
		{
			
	
            try{
				
			 $scope.total_table3 = data.datasportsgroup.competition.season.rounds.total.table;
				$scope.tot_tbl_not = "true";
			
			}catch(e){}
		
         

		
        }).error(function(data, status, headers, config) {
           
        });
		
 }
 


function play_rank()
	{	





		$scope.show_logo1 = 'true';
		  $('#loader_outer1').show();

	  $http({
			  	
            	method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('season_id'),"ev": "goals" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


                              }).success(function(data, status, headers, config)
	                     	{
			
                       			
			
			                 try{
			
			                   $scope.rank = data.datasportsgroup.competition.season.goalscorers.people;
							
							
			                 }catch(e){$scope.rank='';
							
							 $scope.rank_section = 'false';};
							 if($scope.rank){
								  $scope.rank_section = 'true';
                               		var arr = Object.keys($scope.rank).map(function(k) { return $scope.rank[k] });
			
			
			
             var len = arr.length;
		    

	           $scope.currentPage = 0;
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
			
    	}
		

		return $scope.currentPage >= len/$scope.pageSize - 1;
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr.slice($scope.currentPage*$scope.pageSize);
		


    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr;
		


    }

    init();
						
			
							 }
							
							 	$scope.show_logo1 = 'false';
		  $('#loader_outer1').hide();
                             }).error(function(data, status, headers, config) {
                          
                          });
	  			
	}

	
	    $http({
			
			
			
           method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id":window.localStorage.getItem('compi_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
		
			 $scope.season  = data.datasportsgroup.competition.season;
			
			
	
			

        }).error(function(data, status, headers, config) {
            
        });
	




	


	 		 $http({
					method  : 'POST',
		url  : '/get_competitions',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			
							
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               var arr_dcl=[];						
			
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id==$scope.cnt_id)
							 {
					         arr_dcl.push($scope.comp[key]);
							 $scope.area_name=$scope.comp[key].$.area_name;
							
							 }
						});
		

						$scope.compeetts=arr_dcl;
						
			
                             }).error(function(data, status, headers, config) {
                            
                          }); 			
		
		
		
		
		
		
		
		
		
		
		
		

$scope.tabs = [{
            title: 'overview',
            url: 'one.tpl.html'
        }, {
            title: 'League tables',
            url: 'two.tpl.html'
        },
		{
            title: 'History',
            url: 'three.tpl.html'
        }];
		
		
		
		
	  $scope.currentTab = 'one.tpl.html';

     $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
		if($scope.currentTab == 'three.tpl.html')
		{ 
		
		  	$scope.show_logo5 = 'true';
		  $('#loader_outer1').show();
		
		
		
	      $http({
		
			
           method  : 'POST',
		url  : '/get_trophies',
                data : {"comp_id": $scope.comp_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
		
		
			

			
	    $scope.mschk;
			

			try{
			 $scope.season = data.datasportsgroup.competition.season;
			 $scope.winner = data.datasportsgroup.competition.season.winner;

			
			 $scope.mschk=1;
			 }
             catch(e){
			 $scope.season = data.datasportsgroup;
			 $scope.winner = data.datasportsgroup;

		
			 $scope.mschk=0;
			 }			
			
			

        }).error(function(data, status, headers, config) {
            
        });
	


	   $http({
		
	
           method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": $scope.comp_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
			
			 $scope.current_season  = data.datasportsgroup.competition.season[0].$.title;
			  $scope.current_season_id  = data.datasportsgroup.competition.season[0].$.season_id;
			
		
			
		$scope.show_logo5 = 'false';
		  $('#loader_outer1').hide();
			

        }).error(function(data, status, headers, config) {
           
        });

	
	
	

			
		}



	
	

			
		}
		




    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
		
		
		
	$scope.myStyle={'color':'black'}


$scope.tabs1 = [{
            title: 'Topscorers',
            url: 'sub.one.tpl.html'
        }, {
            title: 'Assists',
            url: 'sub.two.tpl.html'
        },
		{
            title: 'Bookings',
            url: 'sub.three.tpl.html'
        }];
		
		
		
		
		
		
		  $scope.currentTab1 = 'sub.one.tpl.html';


		     $scope.onClickTab1 = function (tab) {
        $scope.currentTab1 = tab.url;
		
		if($scope.currentTab1 == 'sub.two.tpl.html')
		{
	   	$scope.show_logo2 = 'true';
		  $('#loader_outer1').show();
	

	  $http({
			  	
						
             method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('season_id'),"ev": "assists" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		

		
			$scope.assists = data.datasportsgroup.competition.season.assists.people;
			var arra = Object.keys($scope.assists).map(function(k) { return $scope.assists[k] });
			

			
			
             var lena = arra.length;
		     

	           $scope.currentPage2 = 0;
               $scope.pageSize2 = 10;
               $scope.totalPages2 = 0;
               $scope.pagedDataa = [];

			   $scope.pageButtonDisabled2 = function(dir2) {
				 
    	if (dir2 == -1) {
			


			return $scope.currentPage2 == 0;
    	}
		return $scope.currentPage2 >= lena/$scope.pageSize2 - 1;
		
		
    }

    $scope.paginate2 = function(nextPrevMultiplier) {
    	$scope.currentPage2 += (nextPrevMultiplier * 1);
    	$scope.pagedDataa = arra.slice($scope.currentPage2*$scope.pageSize2);
		


    }

    function init() {
	    $scope.totalPages2 = Math.ceil(lena/$scope.pageSize2);
	    $scope.pagedDataa = arra;
		

    }

    init();
			
	
				$scope.show_logo2 = 'false';
		  $('#loader_outer1').hide();

        }).error(function(data, status, headers, config) {
     
        });
	
	
	
	
	
	
	}
	
	
	
	if($scope.currentTab1 == 'sub.three.tpl.html')
		{

	$scope.show_logo3 = 'true';
		  $('#loader_outer1').show();	
	
		  		    var arr_compare =[];
		            var len;
		
		

			
	



	
	
	


					
	  $http({
			  		
            	 method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('season_id'),"ev": "bookings" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
	
			$scope.bookings = data.datasportsgroup.competition.season.bookings.people;
			
		    $scope.get_yellowredcards($scope.bookings);
			
			
			
			
		
						
			
	
        }).error(function(data, status, headers, config) {
            
        });
	
	
	$scope.get_yellowredcards = function(booking){
	
	

		
			
 $http({
            	 method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('season_id'),"ev": "yellowredcards" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
	        	
			$scope.yellowredcards = data.datasportsgroup.competition.season.yellowredcards.people;
			

			
			     Object.keys(booking).forEach(function (key1)
				    {
		        Object.keys($scope.yellowredcards).forEach(function (key)
				         {
						     if(key == '$'){
							   	 if($scope.yellowredcards[key].people_id == booking[key1].$.people_id){
								
								    booking[key1].$.red_yellow = $scope.yellowredcards[key].count;
								 }
							 }else{
								 if($scope.yellowredcards[key].$.people_id == booking[key1].$.people_id){
								
								    booking[key1].$.red_yellow = $scope.yellowredcards[key].$.count;
							      }
							      }
							
						   });
						
						
						 });
						
						
                	var arrb = Object.keys(booking).map(function(k) { return booking[k] });
			
			
			
             var lenb = arrb.length;
		  

	           $scope.currentPage1 = 0;
               $scope.pageSize1 = 10;
               $scope.totalPages1 = 0;
               $scope.pagedDatab = [];

			   $scope.pageButtonDisabled3 = function(dir1) {
				
    	if (dir1 == -1) {
			

			return $scope.currentPage1 == 0;
    	}
		return $scope.currentPage1 >= lenb/$scope.pageSize1 - 1;
		
		
    }

    $scope.paginate3 = function(nextPrevMultiplier) {
    	$scope.currentPage1 += (nextPrevMultiplier * 1);
    	$scope.pagedDatab = arrb.slice($scope.currentPage1*$scope.pageSize1);
		


    }

    function init() {
	    $scope.totalPages1 = Math.ceil(lenb/$scope.pageSize1);
	    $scope.pagedDatab = arrb;
		


    }

    init();						
			
				$scope.show_logo3 = 'false';
		  $('#loader_outer1').hide();
		
        }).error(function(data, status, headers, config) {
           
        }); 	
		
		
	}
	
	}
		
		
		
		
    }
	
	
		
		
		
		

    $scope.isActiveTab1 = function(tabUrl1) {
        return tabUrl1 == $scope.currentTab1;
		
		
    }

	
 }


$scope.qualification_fun($scope.comp_id , $scope.season_id );

 $scope.history=function(sean)
	{

	    $scope.qualification_fun(window.localStorage.getItem('compi_id'), sean);
	}



  $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		
		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };
	
    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
 
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	

   
 

	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
	
	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            
        });
	  	
	})


	.controller('time_detailsCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window, social) {
		
	


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;

	  $scope.match_id = (getParameterByName('match_id'));

	
		$scope.tabs = [{
            title: 'Summary',
            url: 'one.tpl.html'
        }, {
            title: 'Head-To-Head',
            url: 'two.tpl.html'
        }];








       $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		
       
		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };
		
		
		
		
		
		
		  $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
		if($scope.currentTab == 'two.tpl.html')
		{
		            	 $http({
            	                method  : 'POST',
		url  : '/get_head2head',
                data : {"id": $scope.match_id },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
                              }).success(function(data, status, headers, config)
	                     	{
			
			
			
			
			
		
			
			

			                   $scope.head2head_matche2 = data.datasportsgroup.head2head_matches.match;

                                           			
			var arr4 = Object.keys($scope.head2head_matche2).map(function(k) { return $scope.head2head_matche2[k] });
			

			
			
             var len = arr4.length;
		   

	           $scope.currentPage = 0;
               $scope.pageSize = 6;
               $scope.totalPages = 0;
               $scope.pagedData4 = [];

			   $scope.pageButtonDisabled4 = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
		return $scope.currentPage >= len/$scope.pageSize - 1;
		
		
    }

    $scope.paginate4 = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData4 = arr4.slice($scope.currentPage*$scope.pageSize);
		

	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData4 = arr4;
		

    }

    init();






			

			  $scope.team_1_win=data.datasportsgroup.head2head.team_1_total.$.wins;
							   $scope.team_2_win=data.datasportsgroup.head2head.team_2_total.$.wins;
							   $scope.total_matches=data.datasportsgroup.head2head.team_1_total.$.matches;
							   $scope.draws=data.datasportsgroup.head2head.team_1_total.$.draws;
                               $scope.team_1_name=data.datasportsgroup.head2head.$.team_1_name;
                               $scope.team_2_name=data.datasportsgroup.head2head.$.team_2_name;								
								
								window.localStorage.setItem('team_a_w',$scope.team_1_win);
								window.localStorage.setItem('team_b_w',$scope.team_2_win);
								window.localStorage.setItem('draw',$scope.draws);
							
			                  
	                          var  a=parseInt(window.localStorage.getItem('team_a_w'));
							  var  b=parseInt(window.localStorage.getItem('team_b_w'));
							  var  c=parseInt(window.localStorage.getItem('draw'));
			
								




 $scope.myJson = {
        globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
        type: "pie",
        backgroundColor: "#fff",

        legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
        tooltip: {
            text: ""
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
                placement: "in",
                text: "%npv %",
                fontSize: "15px",
                textAlpha: 1,
            }
        },
        series: [{
	         text: "Win " +$scope.team_1_name ,
            values: [a],
            backgroundColor: "#FA6E6E #FA9494",
        }, {
            text: "Win " +$scope.team_2_name ,
            values: [b] ,
            backgroundColor: "#28C2D1",
        }, {
            text: "Matches draws",
            values: [c],
            backgroundColor: "#D2D6DE"
        }]
    };
			

                             }).error(function(data, status, headers, config) {
                           
                          });

	
	
	              $scope.selectDate = function(dt) {
             

              }	
	
			
		}
		
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
		
		
    }
		
	
	
		
	$scope.myStyle={'color':'black'}	
	
	
	

	
			
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
		
		
		
		 $scope.f_id = (getParameterByName('f_id'));
		  $scope.s_id = (getParameterByName('s_id'));
          $scope.c_name = (getParameterByName('cid'));
          		
		 


          $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": $scope.c_name},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id  = data.datasportsgroup.competition.season[0].$.season_id;
                            $scope.season_title  = data.datasportsgroup.competition.season[0].$.title;

                           }else{
		
			 $scope.season_id  = data.datasportsgroup.competition.season.$.season_id;
                          $scope.season_title  = data.datasportsgroup.competition.season.$.title;
                         }
			

                        $scope.league_name1  = data.datasportsgroup.competition.$.name;
                        $scope.league_id1  = data.datasportsgroup.competition.$.competition_id;
                        $scope.area_name  = data.datasportsgroup.competition.$.area_name;
                        $scope.area_id1  = data.datasportsgroup.competition.$.area_id;


			
			window.localStorage.setItem('s1_id',$scope.season_id);			
	
			

        }).error(function(data, status, headers, config) {
            
        });

			  var venue_id='';
		  	var arr_req= [];
			
		
	$scope.get_first_match = function(first_id, loc_val, com_id){
		
			$scope.show_logo = 'true';
		  $('#loader_outer3').show();
		
		$scope.loc_val = loc_val;
		
	  $http({
            	method  : 'POST',
		url  : '/get_team',
                data : {"team": first_id, "limit":"45"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
			
			$scope.comps_name= [];
			$scope.comps_id= [];
			var all_comps=[];
			var all_comps1=[];
			
			var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
			$scope.day = ('0' + date.getDate()).slice(-2);
			
			var arr = [];
			
			
			
			
			
			
			
			$scope.required_seasons1 = function(id){
				
				$scope.last_match1 = data.datasportsgroup.team.last_matches.match;
			    $scope.next_match = data.datasportsgroup.team.next_matches.match;
				
			 $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml2 = data.datasportsgroup.competition.season ;
				
				
					Object.keys($scope.last_match1).forEach(function (key)
				{
					Object.keys($scope.xml2).forEach(function (key2)
				{
					
					
					if($scope.xml2[key2].$.season_id == $scope.last_match1[key].$.season_id){
						
						all_comps.push($scope.last_match1[key]);
					}
					
				});
					
				});
				
				
						Object.keys($scope.next_match).forEach(function (key)
				{
					Object.keys($scope.xml2).forEach(function (key2)
				{
					
					
					if($scope.xml2[key2].$.season_id == $scope.next_match[key].$.season_id){
						
						all_comps1.push($scope.next_match[key]);
					}
					
				});
					
				});
				
				
				
				
				$scope.last_match1 = all_comps;
				$scope.next_match = all_comps1;
				
			   $scope.get_val1($scope.loc_val);
			



			
					
	
			

        }).error(function(data, status, headers, config) {
            
        });
				
			}
			
				
			if(com_id != 1 && com_id != '' && !isNaN(com_id)){
			  $scope.required_seasons1(com_id);
			
			
			}else{$scope.last_match1 = data.datasportsgroup.team.last_matches.match;
               	$scope.next_match = data.datasportsgroup.team.next_matches.match;
				
					
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match1).forEach(function (key)
				{
				if(key != (Object.keys($scope.last_match1).length)-1){
					if($scope.last_match1[key].$.team_a_id == first_id){
					arr.push($scope.last_match1[key]);
					}		
				}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match1).forEach(function (key1)
				{
					if(key1 != (Object.keys($scope.last_match1).length)-1){
					if($scope.last_match1[key1].$.team_b_id == first_id){
					arr.push($scope.last_match1[key1]);
					}	
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match1).forEach(function (key2)
				{
					if(key2 != (Object.keys($scope.last_match1).length)-1){
					arr.push($scope.last_match1[key2]);
					}			
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match).forEach(function (key)
				{
					if($scope.next_match[key].$.team_a_id == first_id){
					arr.push($scope.next_match[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match).forEach(function (key1)
				{
					if($scope.next_match[key1].$.team_b_id == first_id){
					arr.push($scope.next_match[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match).forEach(function (key2)
				{
					
					arr.push($scope.next_match[key2]);
										
				});
			}
			
			
					    $scope.total_match = arr;
						
				
			$scope.make_comps = function(){
			
			
				Object.keys($scope.total_match).forEach(function (key9) {
			

				
					try{
				
					var sea_id = $scope.total_match[key9].$.season_id;
					
					
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
	            async: false,



        }).success(function(data, status, headers, config)
		{
				try{

        
			$scope.comps_name[key9]= data.datasportsgroup.competition.$.name;
			$scope.comps_id[key9]= data.datasportsgroup.competition.$.competition_id;
				
		
				}catch(e){
				};

		

        }).error(function(data, status, headers, config) {
           
        });
	  			

         }catch(e){
		 };
				
				
				});
				}
			
			$scope.show_logo = 'false';
		  $('#loader_outer3').hide();
		
				


              var arr1 = Object.keys($scope.total_match).map(function(k) { return $scope.total_match[k] });
			


			
			
             var len = arr1.length;
		    
            if(loc_val == 'home_away'){$scope.currentPage = 4;}
			if(loc_val == 'home'){$scope.currentPage = 0;}
			if(loc_val == 'away'){$scope.currentPage = 0;}
	
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
             
		return $scope.currentPage >= ((len/$scope.pageSize) - 1);
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);
		


	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);

		

;
    }

    init();
			  $('#loader_outer').hide();
				
  				}
			  	
				
		
				$scope.get_val1 = function(loc_val){
				
				
			
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match1).forEach(function (key)
				{
					if($scope.last_match1[key].$.team_a_id == first_id){
					arr.push($scope.last_match1[key]);
					}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match1).forEach(function (key1)
				{
					if($scope.last_match1[key1].$.team_b_id == first_id){
					arr.push($scope.last_match1[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
				
	
			  Object.keys($scope.last_match1).forEach(function (key2)
				{
					
					arr.push($scope.last_match1[key2]);
										
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match).forEach(function (key)
				{
					if($scope.next_match[key].$.team_a_id == first_id){
					arr.push($scope.next_match[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match).forEach(function (key1)
				{
					if($scope.next_match[key1].$.team_b_id == first_id){
					arr.push($scope.next_match[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match).forEach(function (key2)
				{
					
					arr.push($scope.next_match[key2]);
										
				});
			}
			
			
					    $scope.total_match = arr;
				
			
			   $scope.make_comps1 = function(){
			
				Object.keys($scope.total_match).forEach(function (key)
				{
					
				
					var sea_id = $scope.total_match[key].$.season_id;
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{

        
				$scope.comps_name[key]= data.datasportsgroup.competition.$.name;
			$scope.comps_id[key]= data.datasportsgroup.competition.$.competition_id;
				
		
				}catch(e){};



        }).error(function(data, status, headers, config) {
           
        });
	  			


				
				
				});
				}
				
       
		  	$scope.show_logo = 'false';
		  $('#loader_outer3').hide();

              var arr1 = Object.keys($scope.total_match).map(function(k) { return $scope.total_match[k] });
			


			
			
             var len = arr1.length;
		   
            if(loc_val == 'home_away'){$scope.currentPage = 0;}
			if(loc_val == 'home'){$scope.currentPage = 0;}
			if(loc_val == 'away'){$scope.currentPage = 0;}
	
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
              
		return $scope.currentPage >= ((len/$scope.pageSize) - 1);
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);
		


	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr1.slice($scope.currentPage*$scope.pageSize);

		


    }

    init();
			
		  $('#loader_outer').hide();
			
				}
			
				try{
				 $scope.name1=data.datasportsgroup.team.$.short_name;	
				 if(!$scope.name1){
				 $scope.name1=data.datasportsgroup.team.$.current_team_name;}
			
			$scope.t_id1=data.datasportsgroup.team;
			
			venue_id = data.datasportsgroup.team.team_extra.primary_venue_id;
			
				}catch(e){};
			
		
				
			try{
	
			$scope.team_name = data.datasportsgroup.team.current_team_name;
			$scope.area_id1 = data.datasportsgroup.team.$.area_id;
			
			    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			
			
			
		
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               var arr_dcl=[];	
                          							
			                 arr_dcl.push({name:'All Competition', id:1});
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id == $scope.area_id1)
							 {
					         arr_dcl.push($scope.comp[key]);
							
							
							 }
						});
		

						   $scope.compeetts=arr_dcl;
						
			

        }).error(function(data, status, headers, config) {
            
        });

			
			
			
			
			
			}catch(e){};
			
			try{
			$scope.next_match_vs = data.datasportsgroup.team.next_matches.match[0].date;
			}catch(e){};
		
			
	

		
		
		
		
		
		
		
		    $('#loader_outer').hide();
		
		
		
			

        }).error(function(data, status, headers, config) {
            
        });
	  	
	
	}
	
	

	
	$scope.get_first_match($scope.f_id,'home_away',1);
	
	
	
	$scope.get_second_match = function(second_id, loc_val, com_id){
		
			$scope.show_logo4 = 'true';
		  $('#loader_outer1').hide();
		
		
		
	  $http({
		
		  method  : 'POST',
		url  : '/get_team',
                data : {"team": second_id, "limit":"45"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
				

        }).success(function(data, status, headers, config)
		{
		
			$scope.comps_name1= [];
			$scope.comps_id1= [];
			var all_comps3=[];
			var all_comps4=[];
			
			var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
			$scope.day = ('0' + date.getDate()).slice(-2);
			
			
		
			
			
			$scope.xml = data.datasportsgroup.team;
			$scope.name2=data.datasportsgroup.team.$.short_name;
			if(!$scope.name2){
		    $scope.name2=data.datasportsgroup.team.$.current_team_name;}
			$scope.t_id2=data.datasportsgroup.team;
			var arr1 = [];
			
			
			
			
			$scope.required_seasons2 = function(id){
				
				$scope.last_match2 = data.datasportsgroup.team.last_matches.match;
			$scope.next_match2 = data.datasportsgroup.team.next_matches.match;
				
			 $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml3 = data.datasportsgroup.competition.season ;
				
				
					Object.keys($scope.last_match2).forEach(function (key)
				{
					Object.keys($scope.xml3).forEach(function (key2)
				{
					
					
					if($scope.xml3[key2].$.season_id == $scope.last_match2[key].$.season_id){
						
						all_comps3.push($scope.last_match2[key]);
					}
					
				});
					
				});
				
				
						Object.keys($scope.next_match2).forEach(function (key)
				{
					Object.keys($scope.xml3).forEach(function (key2)
				{
					
					
					if($scope.xml3[key2].$.season_id == $scope.next_match2[key].$.season_id){
						
						all_comps4.push($scope.next_match2[key]);
					}
					
				});
					
				});
				
				
				
				
				$scope.last_match2 = all_comps3;
				$scope.next_match2 = all_comps4;
				
			   $scope.get_val2();
			



			
					
	
			

        }).error(function(data, status, headers, config) {
           
        });
				
			}
			
			
				if(com_id != 1 && com_id != '' && !isNaN(com_id)){
			  $scope.required_seasons2(com_id);
			
			
			}else{
			
			$scope.last_match2 = data.datasportsgroup.team.last_matches.match;
			$scope.next_match2 = data.datasportsgroup.team.next_matches.match;
			
			if(loc_val == 'home'){
	        Object.keys($scope.last_match2).forEach(function (key)
				{
					if(key != (Object.keys($scope.last_match2).length)-1){
					if($scope.last_match2[key].$.team_a_id == second_id){
					arr1.push($scope.last_match2[key]);
					}	
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match2).forEach(function (key1)
				{
					if(key1 != (Object.keys($scope.last_match2).length)-1){
					if($scope.last_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.last_match2[key1]);
					}	
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match2).forEach(function (key2)
				{
					if(key2 != (Object.keys($scope.last_match2).length)-1){
					arr1.push($scope.last_match2[key2]);
					}					
				});
			}
			
			
			
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match2).forEach(function (key)
				{
					if($scope.next_match2[key].$.team_a_id == second_id){
					arr1.push($scope.next_match2[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match2).forEach(function (key1)
				{
					if($scope.next_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.next_match2[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match2).forEach(function (key2)
				{
					
					arr1.push($scope.next_match2[key2]);
										
				});
			}
			

			$scope.total_match1 = arr1;
		
                   $scope.make_comps2 = function(){
             	Object.keys($scope.total_match1).forEach(function (key)
				{
					try{
					var sea_id1 = $scope.total_match1[key].$.season_id;
					}catch(e){var sea_id1 ='';};
				if(sea_id1){
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id1},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{
        
		$scope.comps_name1[key]= data.datasportsgroup.competition.$.name;
			$scope.comps_id1[key]= data.datasportsgroup.competition.$.competition_id;
				}catch(e){};



        }).error(function(data, status, headers, config) {
            
        });
	  			
				}


				
				});
				   }
				
				
				   	$scope.show_logo4 = 'false';
		  $('#loader_outer1').hide();

             var arr2 = Object.keys($scope.total_match1).map(function(k) { return $scope.total_match1[k] });
			


			
			
             var len = arr2.length;
		

	            if(loc_val == 'home_away'){$scope.currentPage1 = 4;}
			if(loc_val == 'home'){$scope.currentPage1 = 0;}
			if(loc_val == 'away'){$scope.currentPage1 = 0;}
               $scope.pageSize1 = 10;
               $scope.totalPages1 = 0;
               $scope.pagedData1 = [];

			   $scope.pageButtonDisabled1 = function(dir) {
			
    	if (dir == -1) {
			

			return $scope.currentPage1 == 0;
    	}
		return $scope.currentPage1 >= ((len/$scope.pageSize1) - 1);
		
		
    }

    $scope.paginate1 = function(nextPrevMultiplier) {
    	$scope.currentPage1 += (nextPrevMultiplier * 1);
    	$scope.pagedData1 = arr2.slice($scope.currentPage1*$scope.pageSize1);
		
	
    }

    function init() {
	    $scope.totalPages1 = Math.ceil(len/$scope.pageSize1);
	    $scope.pagedData1 = arr2.slice($scope.currentPage1*$scope.pageSize1);
		


    }

    init();
	  $('#loader_outer').hide();

			}	
			
			
					
				$scope.get_val2 = function(){
					
					
				
				
			
			if(loc_val == 'home'){
				
				
	        Object.keys($scope.last_match2).forEach(function (key)
				{
					if($scope.last_match2[key].$.team_a_id == second_id){
					arr1.push($scope.last_match2[key]);
					}					
				});
			
			}
			
			
				if(loc_val == 'away'){
	        Object.keys($scope.last_match2).forEach(function (key1)
				{
					if($scope.last_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.last_match2[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.last_match2).forEach(function (key2)
				{
					
					arr1.push($scope.last_match2[key2]);
										
				});
			}
			
			
				
		
		
			
			if(loc_val == 'home'){
	        Object.keys($scope.next_match2).forEach(function (key)
				{
					if($scope.next_match2[key].$.team_a_id == second_id){
					arr1.push($scope.next_match2[key]);
					}					
				});
			
			}
			
				if(loc_val == 'away'){
	        Object.keys($scope.next_match2).forEach(function (key1)
				{
					if($scope.next_match2[key1].$.team_b_id == second_id){
					arr1.push($scope.next_match2[key1]);
					}					
				});
			
			}
			
				if(loc_val == 'home_away'){
	
			  Object.keys($scope.next_match2).forEach(function (key2)
				{
					
					arr1.push($scope.next_match2[key2]);
										
				});
			}
			
			
					    $scope.total_match1 = arr1;
						
				
			
			   $scope.make_comps3 = function(){
			
				Object.keys($scope.total_match1).forEach(function (key)
				{
					
				
					var sea_id1 = $scope.total_match1[key].$.season_id;
					
					
					
			  $http({
                method  : 'POST',
		        url  : '/get_rounds',
                data : {"season_id": sea_id1},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },



        }).success(function(data, status, headers, config)
		{
				try{

       
			$scope.comps_name1[key]= data.datasportsgroup.competition.$.name;
			$scope.comps_id1[key]= data.datasportsgroup.competition.$.competition_id;	
				
		
				}catch(e){};



        }).error(function(data, status, headers, config) {
            
        });
	  			


				
				
				});
				
			   }
			  
			   	$scope.show_logo4 = 'false';
		  $('#loader_outer1').hide();

              var arr2 = Object.keys($scope.total_match1).map(function(k) { return $scope.total_match1[k] });
			


			
			
             var len = arr2.length;
		 
            if(loc_val == 'home_away'){$scope.currentPage1 = 0;}
			if(loc_val == 'home'){$scope.currentPage1 = 0;}
			if(loc_val == 'away'){$scope.currentPage1 = 0;}
	
               $scope.pageSize1 = 10;
               $scope.totalPages1 = 0;
               $scope.pagedData1 = [];

			   $scope.pageButtonDisabled1 = function(dir) {
				
    	if (dir == -1) {
			


			return $scope.currentPage1 == 0;
    	}
            
		return $scope.currentPage1 >= ((len/$scope.pageSize1) - 1);
		
		
    }

    $scope.paginate1 = function(nextPrevMultiplier) {
    	$scope.currentPage1 += (nextPrevMultiplier * 1);
    	$scope.pagedData1 = arr2.slice($scope.currentPage1*$scope.pageSize1);
		

;
	
    }

    function init() {
	    $scope.totalPages1 = Math.ceil(len/$scope.pageSize1);
	    $scope.pagedData1 = arr2.slice($scope.currentPage1*$scope.pageSize1);

		


    }

    init();
			
		
			
				}
			
			
			try{
			$scope.team_name = data.datasportsgroup.team.current_team_name;
			}catch(e){};
			try{
			$scope.next_match_vs = data.datasportsgroup.team.next_matches.match[0].date;
			$scope.area_id2 = data.datasportsgroup.team.$.area_id;
			
			    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			
			
			
		
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               var arr_dcl1=[];	
                          							
			                 arr_dcl1.push({name:'All Competition', id:1});
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id == $scope.area_id2)
							 {
					         arr_dcl1.push($scope.comp[key]);
							
							
							 }
						});
		

						   $scope.compeetts1=arr_dcl1;
						
			

        }).error(function(data, status, headers, config) {
        
        });

			}catch(e){};
		
			
	      $('#loader_outer').hide();
			

        }).error(function(data, status, headers, config) {
          
        });
		
	}
	
	
	$scope.get_second_match($scope.s_id,'home_away',1);
	
	
	
	$scope.change_home = function(id1, id2){
	
		
		           if(id1 == 1 || id1 == 'Home & Away'){$scope.get_first_match($scope.f_id,'home_away',id2);
				
			
		            }else if(id1 == '2'){
			            $scope.get_first_match($scope.f_id,'home',id2);
		                }else{$scope.get_first_match($scope.f_id,'away',id2);
		                }
		
	             }
				
	$scope.change_home1 = function(id, id2){
		
		           if(id == 1 || id == 'Home & Away'){$scope.get_second_match($scope.s_id,'home_away',id2);
		            }else if(id == 2){
			            $scope.get_second_match($scope.s_id,'home',id2);
		                }else{$scope.get_second_match($scope.s_id,'away',id2);
		                }
		
	             }	
				
				
		     $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
            
        });
		

          }
		
		

  $('#loader_outer').hide();

	})

        .controller('worldCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window, social) {
		


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
		
		            	 $http({
                                        method  : 'POST',
		url  : '/get_competitions',

                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
		
			
			                arr=[];
			
			

			                   $scope.comp = data.datasportsgroup.competition;

                               							
			
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id==1)
							 {
					         arr.push($scope.comp[key]);					
							 }
						});
		
                        $scope.world1=arr;						
			

$scope.sort_comp = function(){	
  var sw; 					 
			
                         Object.keys($scope.world1).forEach(function(key12)
{
	

   Object.keys($scope.world1).forEach(function(key22)
  {
	  if(key22 >=0)
	  {
 		   if($scope.world1[key12].$.competition_id < $scope.world1[key22].$.competition_id)
			{   sw = $scope.world1[key22];
			   ($scope.world1[key22]) = ($scope.world1[key12]);
               ($scope.world1[key12]) = (sw);
		     }
			


            			
	
	  }
  });

});
}

       $scope.sort_comp1 = function(){

$scope.world = $scope.world1;	
	 

}


             	$scope.sort_comp();
				$scope.sort_comp1();

                             }).error(function(data, status, headers, config) {
                           
                          });
						
						



    	 $http({method  : 'POST',
		url  : '/get_areas',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          }, 			
                              }).success(function(data, status, headers, config)
	                     	{
			
					
			                arc=[];
			
			

			                   $scope.area = data.datasportsgroup.area;
			

                               							
			
			             Object.keys($scope.area).forEach(function (key)
				         {
						     if(($scope.area[key].$.parent_area_id==1) && ($scope.area[key].$.area_id<=7 && $scope.area[key].$.area_id!=6))
							 {
					         arc.push($scope.area[key]);					
							 }
						});
		
                        $scope.cont=arc;						
			

						
						
						
						 $('#loader_outer').hide();

                             }).error(function(data, status, headers, config) {
                            
                          });

						
$scope.next_pagec=function(compe_id)
{
	if(compe_id == 18 || compe_id == 19){
	window.location.href = './qualification_details.html?comp_id='+compe_id+'&cnt_id=1';
	}else{
			window.location.href = './cup_details.html?comp_id='+compe_id+'&cnt_id=1';
		
	}
}

$scope.next_page=function(compe_id)
{
	window.location.href = './continents.html?con_id='+compe_id;
}


  $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
  
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	
  
   
 

	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
		
	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            
        });




						
						
						

	})




		

  	.controller('continentsCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window ,social) {
		
		


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
	
		function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
	
		 $scope.con_id = (getParameterByName('con_id'));


				
		 $http({method  : 'POST',
		url  : '/get_competitions',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },                               }).success(function(data, status, headers, config)
	                     	{
			
			
			
			                ara=[];
			
			

			                   $scope.comp = data.datasportsgroup.competition;

                               							
			
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id==$scope.con_id)
							 {
					         ara.push($scope.comp[key]);
							 $scope.area_name=$scope.comp[key].$.area_name;
							 }
						});
		
                        $scope.conts1=ara;	
					
                       

$scope.sort_comp = function(){	
  var sw; 					 
			
                         Object.keys($scope.conts1).forEach(function(key12)
{
	


   Object.keys($scope.conts1).forEach(function(key22)
  {
	  if(key22 >=0)
	  {
 		   if($scope.conts1[key12].$.competition_id < $scope.conts1[key22].$.competition_id)
			{   sw = $scope.conts1[key22];
			   ($scope.conts1[key22]) = ($scope.conts1[key12]);
               ($scope.conts1[key12]) = (sw);
		     }
			


            			
	
	  }
  });

});
}

       $scope.sort_comp1 = function(){

$scope.conts = $scope.conts1;	


}


             	$scope.sort_comp();
				$scope.sort_comp1();


                             }).error(function(data, status, headers, config) {
                           
                          }); 				


						
						
							   $scope.check_img = function(id){
							  alert(id);
						  }


	

    	 $http({
			method  : 'POST',
		url  : '/get_areas',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
                              }).success(function(data, status, headers, config)
	                     	{
			
			 			
			                arcon=[];
			                arrr_coni=[];
			

			                   $scope.area = data.datasportsgroup.area;

                               							
			
			             Object.keys($scope.area).forEach(function (key)
				         {
						     if(($scope.area[key].$.parent_area_id==$scope.con_id )&& ($scope.area[key].$.area_id==76 || $scope.area[key].$.area_id==68 || $scope.area[key].$.area_id==80 || $scope.area[key].$.area_id==100 || $scope.area[key].$.area_id==164 || $scope.area[key].$.area_id==176))
							 {
					         arcon.push($scope.area[key]);					
							 }
							  if(($scope.area[key].$.parent_area_id==1) && ($scope.area[key].$.area_id<=7 && $scope.area[key].$.area_id!=6))
							 {  
					           arrr_coni.push($scope.area[key]);					
							 }
						});
		
                        $scope.country=arcon;
						
						if(($scope.country).length=='0')
						{
                        $scope.country_check='true';
						}						
						$scope.conttnts=arrr_coni;
			

						
						 $('#loader_outer').hide();
						

                             }).error(function(data, status, headers, config) {
                          
                          });


						
	$scope.continents_fun=function(value)
{

	

	window.location.href = './continents.html?con_id='+value;
	
}

$scope.next_pagec=function(compe_id, cid)
{
	window.location.href = './qualification_details.html?comp_id='+compe_id+'&cnt_id='+cid;
}

$scope.next_page=function(compe_id, cid)
{
	window.location.href = './country.html?con_id='+compe_id+'&cnt_id='+cid;
}


  $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;

  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	

   
 

	 $scope.searched = function(c_area,v_com,v_for) {
	

	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }

      }

        }).error(function(data, status, headers, config) {
            
        });


	


	})		
		
.controller('LiveCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window,social) {
		
	


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
		
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
	
	
        	   $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
           
        });
		

          }
	

$scope.getdata= function(FromDate) {


	
	
		
		
	
              $http({
            	method  : 'POST',
		url  : '/get_matches_day',
                data : {"day": FromDate},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	
		{
		
			
		
			$scope.live_c = [];
			if(data.datasportsgroup.competition != null || data.datasportsgroup.competition != "undefined"){
			
		try{
		
			
			$scope.xml = data.datasportsgroup.competition;
			
			$scope.match = data.datasportsgroup.competition.match;
			
			$scope.competition_name = data.datasportsgroup.competition.competition_name;
			$scope.area_name = data.datasportsgroup.competition.area_name;
			var data1=data.datasportsgroup.competition;
			
			var data2=data.datasportsgroup.competition.match;
			
			array_col2 = {};
			var compition_id;
			final_match_array=[];
			final_live_array=[];
			total_objects=0;
		}catch(e){};
			Object.keys(data1).forEach(function (key)
			{
				if(key>=0)
				{
					total_objects=2;
				}
				else
				{
					total_objects=1;
				}
			});
				if(total_objects>1)
			{
				

				Object.keys(data1).forEach(function (key)
					{
						array_col=[];
                        array_col_match=[];
						array_live_match=[];
						array_live=[];
						array_col['$']=data1[key]['$'];
       match_single=0;
	Object.keys(data1[key]['match']).forEach(function (key1)
						{
							if(key1=='$')
{
	try{
match_single=1;
array_col_match[0]=data1[key]['match'];
array_col['match']=array_col_match;
}catch(e){};

try{
if(data1[key]['match'][key1].status == 'Playing' || data1[key]['match'][key1].status == 'Break'){
$scope.msg= "true";
$scope.live_c[key] = 'live';
array_live[key]=data1[key]['$'];

array_live_match[0]=data1[key]['match'];
array_live['match']=array_live_match;



}
	}catch(e){
	};


}

						});
if(match_single==0)
{
	try{
array_col['match']=data1[key]['match'];


Object.keys(data1[key]['match']).forEach(function (key1) {
						
if(data1[key]['match'][key1].$.status == 'Playing' || data1[key]['match'][key1].$.status == 'Break'){
$scope.msg= "true";
$scope.live_c[key] = 'live';


array_live[key]=data1[key]['$'];
array_live['match']=data1[key]['match'];

}

});

	}catch(e){ 
	};



}
						final_match_array[key]=array_col;	
                        final_live_array[key]=array_live;							

					});

			}
			else
			{
	
				final_match_array[0]=data1;
				
				
				
				Object.keys(final_match_array[0]).forEach(function (key)
						{
							if(key=='match')
					{
                                                        array_col1=[];
														array_live1=[];

                                       Object.keys(final_match_array[0]['match']).forEach(function (key1)
				{
							if(key1=='$')
{
 try{
array_col1[0]=final_match_array[0]['match'];
if(final_match_array[0]['match'][key1].status == 'Playing' || final_match_array[0]['match'][key1].status == 'Break'){
$scope.msg= "true";
$scope.live_c[key] = 'live';

final_live_array[0]=data1;
array_live1[0]=final_match_array[0]['match'];

}
 }catch(e){};
}else{
	
	 try{
array_col1=final_match_array[0]['match'];
if(final_match_array[0]['match'][key1].$.status == 'Playing' || final_match_array[0]['match'][key1].$.status == 'Break'){
$scope.msg= "true";
$scope.live_c[key] = 'live';

final_live_array[0]=data1;
array_live1=final_match_array[0]['match'];

}

 }catch(e){
 };
}




												

					});			
				
							
					}
						});


						
				final_match_array[0]['match']=array_col1;
				final_live_array[0]['match']=array_live1;
				
				
			}
		
			$scope.match1 =  final_match_array;
			$scope.live1 =  final_live_array;
			


           				
			          Object.keys(final_live_array).forEach(function (key3)
			{
			
          try{
		  if(final_live_array[key3].length != null || final_live_array[key3].length != 0){
			var final_arr_check = final_live_array[key3].$.season_id;
			
		  }	
		   }catch(e){
		   };
		
		   if(final_arr_check){

		 $http({
		  method  : 'POST',
		url  : '/get_rounds',
                data : {"season_id": final_live_array[key3].$.season_id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{
		
               try{
			  $scope.xml = data.datasportsgroup.competition.season.rounds;
                     $scope.format  = data.datasportsgroup.competition.$.format;
			   }catch(e){};					

                         if((Object.keys($scope.xml)).length > 1){
						
						          Object.keys($scope.xml).forEach(function (key4)
			                   {
							  try{
							    $scope.round_id  = data.datasportsgroup.competition.season.rounds[key4].$.round_id;
								 }catch(e){};	
								if($scope.round_id == final_live_array[key3].$.round_id && $scope.format == "international_cup"){
									  final_live_array[key3].$.round_name  = data.datasportsgroup.competition.season.rounds[key4].$.name;
									 
								   }
							   });
						

						

                           }else{
		   try{
			 $scope.round_id  = data.datasportsgroup.competition.season.rounds.$.round_id;
			 	if($scope.round_id == final_live_array[key3].$.round_id && $scope.format == "international"){
									  final_live_array[key3].$.round_name  = data.datasportsgroup.competition.season.rounds.$.name;
								   }
            			 }catch(e){};
                         }
			
							
	
			

        }).error(function(data, status, headers, config) {
           
        });
		
		   }
		
		try{
		   	          Object.keys(final_live_array[key3].match).forEach(function (key5)
			{
			
			  $http({
		
		  		
            	 method  : 'POST',
	           	url  : '/get_matches',
                data : {"type": "match","id":final_live_array[key3].match[key5].$.match_id},




        }).success(function(data, status, headers, config)
		{
			
			
		

                     try{    final_live_array[key3].match[key5].$.group_name1 = data.datasportsgroup.competition.season.rounds.group.$.name  ;
					 }catch(e){ }

			
	
			

        }).error(function(data, status, headers, config) {
            
        });
			
			
			
			
			
			});
		}catch(e){
		};
		
		
			
			});
			
		

		
            }else{
$scope.msg = true;}	
	
			 $('#loader_outer').hide();


			

        }).error(function(data, status, headers, config) {
           
        });

    }
	
	
	
	try{
       var date2 = moment.utc();
	   $scope.FromDate =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
      $scope.getdata($scope.FromDate);
      }catch(e){};

      	window.setInterval(function(){
			
		
		
		
		   var date2 = moment.utc();
	    var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		
		
		  $scope.getdata(date3);


			

              }, 60000);
	
	    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;

  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	
  
   
 

	 
	 $scope.searched = function(c_area,v_com,v_for) {
	

	
	  if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            
        });

	
	
		
	})
	

		
.controller('cup_detailsCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window ,social) {
		

	
	


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
	
	function getParameterByName(name) {
     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
     results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
	
		 $scope.cnt_id = (getParameterByName('cnt_id'));
         $scope.comp_id = (getParameterByName('comp_id'));
		 window.localStorage.setItem('compi_id',$scope.comp_id);
     

	        var seas_id;
		
		
$scope.cup_fun=function(comp_id , season_id)		
{		


   if( season_id =='' || season_id == null)
   {




	$http({
							    method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id":$scope.comp_id },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			
							
			
			                   $scope.xml = data.datasportsgroup.competition.season;
                         if((Object.keys($scope.xml)).length > 1){
                           $scope.season_id  = data.datasportsgroup.competition.season[0].$.season_id;
                          $scope.title  = data.datasportsgroup.competition.season[0].$.title;
                             seas_id = $scope.season_id;

	                         window.localStorage.setItem('sea_id', seas_id);

                           }else{
		
			       $scope.season_id  = data.datasportsgroup.competition.season.$.season_id;
                                $scope.title  = data.datasportsgroup.competition.season.$.title;
                             seas_id = $scope.season_id;

						
			                   window.localStorage.setItem('sea_id', seas_id);
                         }
			
					 $scope.comp_name = data.datasportsgroup.competition.$.name;
                                         $scope.comps_id = data.datasportsgroup.competition.$.competition_id;
			

						
                              round();
						     play_rank();

                             }).error(function(data, status, headers, config) {
                           
                          });

  }
  	
  else
 {    window.localStorage.setItem('sea_id',season_id);
	

                              round();
						     play_rank();
 }	


function round()
{		
    	 $http({
		
		  method  : 'POST',
		url  : '/get_rounds',
                data : {"season_id":window.localStorage.getItem('sea_id')},//11942
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			
			                        $scope.rounds = data.datasportsgroup.competition.season.rounds;
							   	var arr_rd = Object.keys($scope.rounds).map(function(k) { return $scope.rounds[k] });
			
                                $scope.len_rd = arr_rd.length;
			                  if($scope.len_rd==1)
			                 {
			                   arr_rd[0]=$scope.rounds;
			                 }
		
				  if ($(window).width() < 765) {
					
                        $scope.currentPage_rd =0;
                            $scope.pageSize_rd =3;
                            $scope.totalPages_rd =0;
                            $scope.pagedData_rd =[];
                            $scope.kk = $scope.len_rd -  $scope.pageSize_rd;
			         

                         $scope.paginate_rd = function(nextPrevMultiplier_rd) {
    	                 $scope.currentPage_rd += (nextPrevMultiplier_rd * 1);
    	                 $scope.pagedData_rd = arr_rd.slice($scope.currentPage_rd);

		                   if(nextPrevMultiplier_rd==1)
						   {
							    $scope.kk = $scope.kk - 1;
								

						   }
						    if(nextPrevMultiplier_rd==-1)
						   {
							    $scope.kk = $scope.kk + 1;
								

						   }
                            }


							
							
							    $scope.rr_id;
							   $scope.rn_no;
							  var flg=0;
							  var chk=0;
							  var date2 = moment.utc();
	                          var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
							 
							  	  Object.keys($scope.rounds).forEach(function (key)
				                 {
					                if(key=='$')
									{										
									 $scope.rr_id=$scope.rounds[key].round_id; 	


                                     $scope.rn_no = (parseInt(key) + 1);									
									}
									else{
                                     if(($scope.rounds[key].$.start_date > date3) && (chk==0) && (flg == 0))
								   {

							              var j= key-1;
										


									     $scope.rr_id = $scope.rounds[j].$.round_id ;
							

										chk=1;
										 $scope.rn_no = (parseInt(j) + 1);
									}	
                                  else{							
                                    if( ($scope.rounds[key].$.end_date >= date3) && (flg==0) && (chk == 0))
									 {
										 $scope.rr_id = $scope.rounds[key].$.round_id ;
										

                                         flg=1;
										  $scope.rn_no = (parseInt(key) + 1);
									 }else if(key == ($scope.len_rd -1) && (flg==0) && (chk==0))
									 {
										  $scope.rr_id = $scope.rounds[key].$.round_id;
										

										   $scope.rn_no = (parseInt(key) + 1);
									 }										
								  }
								 }	
				                 });
							
							
								

                              setInterval(function(){
                         		  if($("li").hasClass('active'))
				                  {
					               
				                  }	
                                   else{
									

									     $("ul").find("[myid='" + $scope.rr_id +"']").addClass('active');
								       }								
							      }, 3000);
										
			                   $scope.get_rnd=function(ff)
		                     {
			
			

				                    $("ul").find("[myid='" + ff +"']").addClass('active');
			                     	var v1=$("li").find("[myid='" + ff +"']").selector;
			                     
				
				                   if($("li").hasClass('active'))
				                  {
					                $("li").removeClass('active');
					                $("ul").find("[myid='" + ff +"']").addClass('active');
					

				                  }
								window.localStorage.setItem('round_id',ff);
                        get_match( window.localStorage.getItem('round_id'));								
		                     }				

					
					    function init_rd() {
	                               $scope.totalPages_rd = Math.ceil($scope.len_rd/$scope.pageSize_rd);
	                               $scope.pagedData_rd = arr_rd;
	

								      if($scope.rn_no > 2)
	                      	     {
                                   for(var i=0 ; i<($scope.rn_no - 1); i++)
                                      {	
                                        $scope.paginate_rd(1);
                                       }
			
		                          }			
								   $scope.get_rnd($scope.rr_id);
                                      }

                                        init_rd();
					
		 
                    }
                       else{
                      
	                        $scope.currentPage_rd =0;
                            $scope.pageSize_rd =6;
                            $scope.totalPages_rd =0;
                            $scope.pagedData_rd =[];
                            $scope.kk = $scope.len_rd -  $scope.pageSize_rd;
			        

                         $scope.paginate_rd = function(nextPrevMultiplier_rd) {
    	                 $scope.currentPage_rd += (nextPrevMultiplier_rd * 1);
    	                 $scope.pagedData_rd = arr_rd.slice($scope.currentPage_rd);
		

		                   if(nextPrevMultiplier_rd==1)
						   {
							    $scope.kk = $scope.kk - 1;
								

						   }
						    if(nextPrevMultiplier_rd==-1)
						   {
							    $scope.kk = $scope.kk + 1;
								

						   }
                            }


							
							
							    $scope.rr_id;
							   $scope.rn_no;
							  var flg=0;
							  var chk=0;
							  var date2 = moment.utc();
	                          var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
							 
							  	  Object.keys($scope.rounds).forEach(function (key)
				                 {
					                if(key=='$')
									{										
									 $scope.rr_id=$scope.rounds[key].round_id; 	

	
                                     $scope.rn_no = (parseInt(key) + 1);									
									}
									else{
                                     if(($scope.rounds[key].$.start_date > date3) && (chk==0) && (flg == 0))
								   {

							              var j= key-1;
										


									     $scope.rr_id = $scope.rounds[j].$.round_id ;
							

										chk=1;
										 $scope.rn_no = (parseInt(j) + 1);
									}	
                                  else{							
                                    if( ($scope.rounds[key].$.end_date >= date3) && (flg==0) && (chk == 0))
									 {
										 $scope.rr_id = $scope.rounds[key].$.round_id ;
										

                                         flg=1;
										  $scope.rn_no = (parseInt(key) + 1);
									 }else if(key == ($scope.len_rd -1) && (flg==0) && (chk==0))
									 {
										  $scope.rr_id = $scope.rounds[key].$.round_id;
										

										   $scope.rn_no = (parseInt(key) + 1);
									 }										
								  }
								 }	
				                 });
							
							
								

                              setInterval(function(){
                         		  if($("li").hasClass('active'))
				                  {
					                 /
				                  }	
                                   else{
								

									     $("ul").find("[myid='" + $scope.rr_id +"']").addClass('active');
								       }								
							      }, 3000);
										
			                   $scope.get_rnd=function(ff)
		                     {
			
			

				                    $("ul").find("[myid='" + ff +"']").addClass('active');
			                     	var v1=$("li").find("[myid='" + ff +"']").selector;
			                     	
				
				                   if($("li").hasClass('active'))
				                  {
					                $("li").removeClass('active');
					                $("ul").find("[myid='" + ff +"']").addClass('active');
					

				                  }
								window.localStorage.setItem('round_id',ff);
                        get_match( window.localStorage.getItem('round_id'));								
		                     }				

					
					    function init_rd() {
	                               $scope.totalPages_rd = Math.ceil($scope.len_rd/$scope.pageSize_rd);
	                               $scope.pagedData_rd = arr_rd;
	

								      if($scope.rn_no > 4)
	                      	     {
                                   for(var i=0 ; i<($scope.rn_no - 4); i++)
                                     {	
                                       $scope.paginate_rd(1);
                                       }
			
		                          }			
								   $scope.get_rnd($scope.rr_id);
                                      }

                                        init_rd();
					   }		
                             }).error(function(data, status, headers, config) {
                            
							window.location='error_page.html';
                          });
}
				
  var ab= "window.localStorage.getItem('round_id')";
	
 function get_match(ab)
{	
 $scope.show_logo = 'true';
		  $('#loader_outer1').hide();

    	 $http({
								
            	                 method  : 'POST',
		       url  : '/get_matches',
                data : {"type":"round",id: window.localStorage.getItem('round_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
                              }).success(function(data, status, headers, config)
	                     	{
			
			
                                             ar_sk=[];
                                              var mat_type;											

			
							
							    try{
			                       $scope.matches = data.datasportsgroup.competition.season.rounds;
								

							     }catch(e){
								   $scope.matches = data.datasportsgroup.competition.season;
								

								
							     }
							




Object.keys($scope.matches).forEach(function (key)
			{
	
			
			     	 if(key=='match')
							 {
						
								Object.keys($scope.matches[key]).forEach(function (key3)
							 	{
									if(key3=='$')
									{
									 ar_sk.push({ mat: $scope.matches[key]});
                                       									
									}
									else
									{
								
									  ar_sk.push({ mat: $scope.matches[key][key3]});
								
									}
									
								});					
							
							
			                 }	


					
                                if(key=='playoff')
							 {    mat_type = 'playoff';
								Object.keys($scope.matches[key]).forEach(function (key4)
							 	{
							
								 if(key4 == '$')
								 {
									

								 }
						 else{
						      if(key4=='match')
							  {
								  Object.keys($scope.matches[key][key4]).forEach(function(key5)
								   {
									  ar_sk.push($scope.matches[key][key4][key5]);
								   });
							  } else{
								  try{	
							          Object.keys($scope.matches[key][key4].match).forEach(function(key5)
								   {
									  ar_sk.push($scope.matches[key][key4].match[key5]);
								   });
								    }catch(e)
								   {
									  if(key4 == '$')
								   {
									

								    }
								     }
									
							  }
									
								 }
									
								});					
							
						
						      }	 					
					  	 			
			
			});



if( mat_type == 'playoff')
{
$scope.arr=ar_sk;
 sk_arr=[];
 sk_arr12=[];
 var e= ar_sk.length;



 Object.keys($scope.arr).forEach(function(key)
{
	sk_arr.push({ date: $scope.arr[key].$.date , mat: $scope.arr[key] });
});


$scope.arr12=sk_arr;
var sw;
  Object.keys($scope.arr12).forEach(function(key1)
{
	 Object.keys($scope.arr12).forEach(function(key2)
  {
	  if(key2 > 0)
	  {
 		if( $scope.arr12[key1].date < $scope.arr12[key2].date)
		{
			 sw = $scope.arr12[key2];
			($scope.arr12[key2]) = ($scope.arr12[key1]);
            ($scope.arr12[key1]) = (sw);
			
            			
		}
	  }
  });
	

	
});
 $scope.dd=$scope.arr12;
  Object.keys($scope.dd).forEach(function(key)
 {
		

 });
kk=[];
 Object.keys($scope.dd).forEach(function(key)
 {       var ll=parseInt(key) + 1;
		 kk.push($scope.dd[ll]);
		
		
 });
 kk[e-1] =$scope.dd[0];





ag=[];
ag1=[];
if(kk.length == ar_sk.length)
{  $scope.aggr = kk;
	


   var ta ,tb , sa , sb, date;
Object.keys($scope.aggr).forEach(function(key)
{
	

	   date=false;
	   ta = $scope.aggr[key].mat.$.team_a_id;
       tb = $scope.aggr[key].mat.$.team_b_id;
	   sa =  $scope.aggr[key].mat.$.score_a;
	   sb =  $scope.aggr[key].mat.$.score_b;
	

 Object.keys($scope.aggr).forEach(function(key4)
{  var k1 = (parseInt(key));
   var k4 = parseInt(key4);

   if( (k1 <= k4) )
   {
	
	   if( ($scope.aggr[k4].mat.$.team_a_id == tb) && ($scope.aggr[k4].mat.$.team_b_id == ta) )			
		 {

	          if( ($scope.aggr[k4].mat.$.score_a != '') && ($scope.aggr[k4].mat.$.score_b!= '') )
			  {
    		  var agre= (parseInt(sb) + parseInt($scope.aggr[k4].mat.$.score_a)) +" - " + (parseInt(sa) + parseInt($scope.aggr[k4].mat.$.score_b));
	
			  ag1.push( {date: $scope.aggr[k4].date, mat:$scope.aggr[k4].mat , agre :agre});
	
		
			  date == true;
			
			  }
			else if(sa != '' &&  sb != '')
			{  var agre= (sb) +" - " + (sa);
				

				   ag1.push( {date: $scope.aggr[k4].date, mat:$scope.aggr[k4].mat , agre :agre});
				  }
			else{
				  var agre= '';
				

	     ag1.push( {date: $scope.aggr[k4].date, mat:$scope.aggr[k4].mat , agre :agre});
			     }
		 }
	        else if(( k4 == k1) ) {
			 var agre = '';
			

			 ag.push( {date: $scope.aggr[k1].date , mat:$scope.aggr[k1].mat , agre :agre});
		 }
	
	
   }

	

});

	
});	
	
}


$scope.ag_final=ag;
$scope.ag1_final=ag1;

var arg_lst=[];
 Object.keys($scope.ag_final).forEach(function(key1)
{
	 Object.keys($scope.ag1_final).forEach(function(key2)
  {
	  if(parseInt(key1) == (parseInt(key2) + ag1.length))
	  {
 			
          arg_lst.push( {date: $scope.ag1_final[key2].date , mat:$scope.ag1_final[key2].mat , agre : $scope.ag1_final[key2].agre});    			
		
	  }
	  else if(key1 == key2 ){
		
		    arg_lst.push( {date: $scope.ag_final[key1].date , mat:$scope.ag_final[key1].mat , agre : ''});
	      }
  });
	

	
});



$scope.tl_match=arg_lst;

}else{
$scope.tl_match=ar_sk;


}
			
$scope.msg=0;

if($scope.tl_match == 0)
{

	$scope.msg=1;
}



						
                               							
			 $scope.show_logo = 'false';
		  $('#loader_outer1').hide();

                             }).error(function(data, status, headers, config) {
                           
                          }); 					
						
}
	function play_rank()
	{
			$scope.show_logo2 = 'true';
		  $('#loader_outer1').show();
		
		
	  $http({
	 	method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season",id:window.localStorage.getItem('sea_id'),"ev": "goals"},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
                              }).success(function(data, status, headers, config)
	                     	{
			
						try{
			                   $scope.rank = data.datasportsgroup.competition.season.goalscorers.people;
						
                               		var arr = Object.keys($scope.rank).map(function(k) { return $scope.rank[k] });
			
			
			
             var len = arr.length;
		    

	           $scope.currentPage = 0;
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData = [];

			   $scope.pageButtonDisabled = function(dir) {
				 
    	if (dir == -1) {
			


			return $scope.currentPage == 0;
    	}
		return $scope.currentPage >= len/$scope.pageSize - 1;
		
		
    }

    $scope.paginate = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData = arr.slice($scope.currentPage*$scope.pageSize);
		

    }

    function init() {
	    $scope.totalPages = Math.ceil(len/$scope.pageSize);
	    $scope.pagedData = arr;
		


    }

    init();
	
	}catch(e){};
						    $('#loader_outer').hide();
			$scope.show_logo2 = 'false';
		  $('#loader_outer1').hide();

                             }).error(function(data, status, headers, config) {
                           
                          });
	}


	
	      $http({
			
			
			
           method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id":window.localStorage.getItem('compi_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
		
			 $scope.season  = data.datasportsgroup.competition.season;
			 $scope.current =  $scope.season[0].$.title;
		

			
	
			

        }).error(function(data, status, headers, config) {
            
        });
	





	


	 	 $http({
					method  : 'POST',
		url  : '/get_competitions',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
                              }).success(function(data, status, headers, config)
	                     	{
			
							
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               var arr_dcl=[];						
			
			             Object.keys($scope.comp).forEach(function (key)
				         {
						     if($scope.comp[key].$.area_id==$scope.cnt_id)
							 {
					         arr_dcl.push($scope.comp[key]);
							 $scope.area_name=$scope.comp[key].$.area_name;
							
							 }
						});
		

						$scope.compeetts=arr_dcl;
						
			
                             }).error(function(data, status, headers, config) {
                            
                          }); 			
		
		
		
		

$scope.tabs = [{
            title: 'overview',
            url: 'one.tpl.html'
        }, {
            title: 'History',
            url: 'two.tpl.html'
        }];
		
		
		
		
	  $scope.currentTab = 'one.tpl.html';

     $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
		if($scope.currentTab == 'two.tpl.html')
		{ 
		 $scope.show_logo5 = 'true';
		  $('#loader_outer1').show();
	
			
		$http({
           method  : 'POST',
		url  : '/get_trophies',
                data : {"comp_id":window.localStorage.getItem('compi_id') },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
        }).success(function(data, status, headers, config)
		{
		
		
			

			
			 $scope.season  = data.datasportsgroup.competition.season;
			 $scope.winner  = data.datasportsgroup.competition.season.winner;
			

			
	
			$scope.show_logo5 = 'false';
		  $('#loader_outer1').hide();

        }).error(function(data, status, headers, config) {
            
        });
	


	   $http({
		
		 	
           method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": window.localStorage.getItem('compi_id')},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
		
                          },

			
        }).success(function(data, status, headers, config)
		{
		
			

			
			 $scope.current_season  = data.datasportsgroup.competition.season[0].$.title;
			
		
        }).error(function(data, status, headers, config) {
           
        });

	
	

			
		}


			
		}

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
		
		
		
	$scope.myStyle={'color':'black'}


$scope.tabs1 = [{
            title: 'Topscorers',
            url: 'sub.one.tpl.html'
        }, {
            title: 'Assists',
            url: 'sub.two.tpl.html'
        },
		{
            title: 'Bookings',
            url: 'sub.three.tpl.html'
        }];
		
		
		
		
		
		
		  $scope.currentTab1 = 'sub.one.tpl.html';


		     $scope.onClickTab1 = function (tab) {
        $scope.currentTab1 = tab.url;
		
		if($scope.currentTab1 == 'sub.two.tpl.html')
		{
           $scope.show_logo3 = 'true';
		  $('#loader_outer1').show();			
	
	  $http({
			  	
				 	
            	 method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id":window.localStorage.getItem('sea_id'),"ev": "assists" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			$scope.assists = data.datasportsgroup.competition.season.assists.people;
			var arra = Object.keys($scope.assists).map(function(k) { return $scope.assists[k] });
			

		    var lena = arra.length;
			

			               if(lena == 1)
			                 {
			                arra[0]=$scope.assists;
				

			                 }
							
		
		

	           $scope.currentPage2 = 0;
               $scope.pageSize2 = 10;
               $scope.totalPages2 = 0;
               $scope.pagedDataa = [];

			   $scope.pageButtonDisabled2 = function(dir2) {

    	if (dir2 == -1) {

			return $scope.currentPage2 == 0;
    	}
		return $scope.currentPage2 >= lena/$scope.pageSize2 - 1;
		
		
    }

    $scope.paginate2 = function(nextPrevMultiplier) {
    	$scope.currentPage2 += (nextPrevMultiplier * 1);
    	$scope.pagedDataa = arrb.slice($scope.currentPage2*$scope.pageSize2);
    }

    function init() {
	    $scope.totalPages2 = Math.ceil(lena/$scope.pageSize2);
	    $scope.pagedDataa = arra;
		

    }

    init();
			
	    $scope.show_logo3 = 'false';
		  $('#loader_outer1').hide();
			

        }).error(function(data, status, headers, config) {
       
        });
	

	
	}
	
	
	
	if($scope.currentTab1 == 'sub.three.tpl.html')
		{
	 $scope.show_logo4 = 'true';
		  $('#loader_outer1').show();
	
		  		    var arr1 =[];
		            var len;
		
					


	  $http({
			  	
            	method  : 'POST',
	     	url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('sea_id'),"ev": "bookings" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
			
			
			
			try{
				$scope.bookings = data.datasportsgroup.competition.season.bookings.people;
				
				$scope.get_yellowredcards($scope.bookings);
			
				
			}catch(e)
		{
		 $scope.show_div1 = false;
		$scope.show_logo4 = 'false';
		$('#loader_outer1').hide();	

		}
				
	
			
		
			
	$scope.show_logo = 'false';
	$('#loader_outer1').hide();	
			

        }).error(function(data, status, headers, config) {
           $scope.show_logo = 'false';
			 $('#loader_outer1').hide();
			
        });
		
		
			$scope.get_yellowredcards = function(booking){
	
	

		
	

 $http({
			 
				
            	 method  : 'POST',
		url  : '/get_player_rankings',
                data : {"type": "season", "id": window.localStorage.getItem('sea_id'),"ev": "yellowredcards" },
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
		
		try{
	        	
			$scope.yellowredcards = data.datasportsgroup.competition.season.yellowredcards.people;
			

			
			     Object.keys(booking).forEach(function (key1)
				    {
		        Object.keys($scope.yellowredcards).forEach(function (key)
				         {
						     if(key == '$'){
							   	 if($scope.yellowredcards[key].people_id == booking[key1].$.people_id){
								
								    booking[key1].$.red_yellow = $scope.yellowredcards[key].count;
								 }
							 }else{
								 if($scope.yellowredcards[key].$.people_id == booking[key1].$.people_id){
								
								    booking[key1].$.red_yellow = $scope.yellowredcards[key].$.count;
							      }
							      }
							
						   });
						
						
						 });
			
		}catch(e){};			
						
                	var arr3 = Object.keys(booking).map(function(k) { return booking[k] });
			
			 $('#loader_outer1').hide();
			 $scope.show_logo4 = 'false';
			
             var len3 = arr3.length;
	

	           $scope.currentPage = 0;
               $scope.pageSize = 10;
               $scope.totalPages = 0;
               $scope.pagedData3 = [];

			   $scope.pageButtonDisabled3 = function(dir) {
		
    	if (dir == -1) {
			

			return $scope.currentPage == 0;
    	}
		return $scope.currentPage >= len3/$scope.pageSize - 1;
		
		
    }

    $scope.paginate3 = function(nextPrevMultiplier) {
    	$scope.currentPage += (nextPrevMultiplier * 1);
    	$scope.pagedData3 = arr3.slice($scope.currentPage*$scope.pageSize);
		

;
	
    }

    function init() {
	    $scope.totalPages = Math.ceil(len3/$scope.pageSize);
	    $scope.pagedData3 = arr3;
	   
		 $('#loader_outer1').hide();
    }

    init(); 	
			
			$('#loader_outer1').hide();	
		
        }).error(function(data, status, headers, config) {
        
        }); 	
		
		
	}
	
	
	
	
	
	}
		
		
		
		
    }
	
	
		
		
		
		

    $scope.isActiveTab1 = function(tabUrl1) {
        return tabUrl1 == $scope.currentTab1;
		
		
    }







}

	  $scope.cup_fun($scope.comp_id , $scope.season_id );
	
	
	$scope.history=function(sean)
	{
		

	    $scope.cup_fun(window.localStorage.getItem('compi_id'), sean);
	}
	

	
	
 $scope.go_to_page2 = function(id){
					


		

            $http({
			
       method  : 'POST',
		url  : '/get_seasons',
                data : {"comp_id": id},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },
			
        }).success(function(data, status, headers, config)
		{

			
		         $scope.xml = data.datasportsgroup.competition.$.format;
				  $scope.competition_id = data.datasportsgroup.competition.$.competition_id;
				   $scope.area_id = data.datasportsgroup.competition.$.area_id;
				
				
				 if($scope.xml == 'domestic_league' || $scope.xml == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;					
					 }else if($scope.xml == 'international_cup' ){
						
						 window.location.href='./qualification_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+$scope.competition_id+'&cnt_id='+$scope.area_id;
					 }

			




			
					
	
			

        }).error(function(data, status, headers, config) {
           
        });
		

          }


  $scope.DisplayCurrentTime=function(time_r) {

		
		var date2 = moment.utc();
	     var date3 =  date2.year() + '-' + ('0' + (date2.month() + 1)).slice(-2) + '-' +  ('0' + date2.date()).slice(-2);
		
       
		   var testDateUtc = moment.utc(date3+' '+time_r);
           var localDate = moment(testDateUtc).local();
		
		       var hours = localDate.hour() > 12 ? localDate.hour() - 12 : localDate.hour();
	
        var am_pm =  localDate.hour() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes =  localDate.minutes()  < 10 ? "0" + localDate.minutes():  localDate.minutes();
		
		    time1 = hours + ":" + minutes + " " + am_pm;
		

	   return time1;
    };

	
	
	    $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;
 
  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	

   
 
	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
		
	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            
        });
	
	
	
	  	
	})		
				  		  				  		
				  			  		
				  		
				  			
		

.controller('countryCtrl', function($scope, $rootScope, $http, $state, $stateParams, $window,social) {
		
	
	


$scope.fkb=social.facebook;
$scope.twi=social.twitter;
$scope.tim=social.tumblr;
$scope.gpl=social.google_plus;
$scope.lindin=social.linkedin;
	
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}	
		
	
		 $scope.cnt_id = (getParameterByName('cnt_id'));
                  $scope.con_id = (getParameterByName('con_id'));

);		
	
	 	 $http({ method  : 'POST',
		url  : '/get_competitions',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          }                              }).success(function(data, status, headers, config)
	                     	{
			
			
			
			                arc_lg=[];
			                arr_dl=[];
							arr_dc=[];
			

			                   $scope.comp = data.datasportsgroup.competition;
			

                               							
			
			             Object.keys($scope.comp).forEach(function (key)
				         {

                                              if($scope.comp[key].$.area_id==$scope.con_id)
							 {
								
								  $scope.cont_name=$scope.comp[key].$.area_name;
							 }
						     if($scope.comp[key].$.area_id==$scope.cnt_id)
							 {
					         arc_lg.push($scope.comp[key]);
							 $scope.area_name=$scope.comp[key].$.area_name;
							 if($scope.comp[key].$.format=="domestic_league" )
							 {
								 arr_dl.push($scope.comp[key]);
							 }
							 else{
								  arr_dc.push($scope.comp[key]);
							 }
							
							 }
						});
		
                        $scope.league=arc_lg;
						$scope.domestic_league1=arr_dl;
						$scope.domestic_cup1=arr_dc;
						
						                       

$scope.sort_comp = function(){	
  var sw; 
 
			
                         Object.keys($scope.domestic_league1).forEach(function(key12)
{
	


   Object.keys($scope.domestic_league1).forEach(function(key22)
  {
	  if(key22 >=0)
	  {
 		   if($scope.domestic_league1[key12].$.competition_id < $scope.domestic_league1[key22].$.competition_id)
			{   sw = $scope.domestic_league1[key22];
			   ($scope.domestic_league1[key22]) = ($scope.domestic_league1[key12]);
               ($scope.domestic_league1[key12]) = (sw);
		     }
			


            			
	
	  }
  });

});


}

$scope.sort_comp2 = function(){	
 var sw1;

                        Object.keys($scope.domestic_cup1).forEach(function(key12)
{
	


   Object.keys($scope.domestic_cup1).forEach(function(key22)
  {
	  if(key22 >=0)
	  {
 		   if($scope.domestic_cup1[key12].$.competition_id < $scope.domestic_cup1[key22].$.competition_id)
			{   sw1 = $scope.domestic_cup1[key22];
			   ($scope.domestic_cup1[key22]) = ($scope.domestic_cup1[key12]);
               ($scope.domestic_cup1[key12]) = (sw1);
		     }
			



            			
	
	  }
  });

});
							}

       $scope.sort_comp1 = function(){

$scope.domestic_league = $scope.domestic_league1;	



}

       $scope.sort_comp3 = function(){

$scope.domestic_cup=$scope.domestic_cup1;



}


             	$scope.sort_comp();
				$scope.sort_comp1();
				$scope.sort_comp2();
				$scope.sort_comp3();
					
						
			
						
						 $('#loader_outer').hide();
						

                             }).error(function(data, status, headers, config) {
                            
                          });


		
	  $http({
			method  : 'POST',
			url  : '/get_areas',
                data : {},
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },

			
                              }).success(function(data, status, headers, config)
	                     	{
			
			

			                arc=[];
			                arc_lg1=[];
			

			                   $scope.area = data.datasportsgroup.area;
			          
                               							
			
			             Object.keys($scope.area).forEach(function (key)
				         {
						     if(($scope.area[key].$.parent_area_id==1) && ($scope.area[key].$.area_id<=7 && $scope.area[key].$.area_id!=6))
							 { 
					         arc.push($scope.area[key]);					
							 }
							  if($scope.area[key].$.area_id==68 ||$scope.area[key].$.area_id==76 ||$scope.area[key].$.area_id==80 || $scope.area[key].$.area_id==100||$scope.area[key].$.area_id==164 || $scope.area[key].$.area_id==176)
							 {
								
					         arc_lg1.push($scope.area[key]);
							
							 $scope.area_name1=$scope.area[key].$.name;
							
							
							 }
						});
		
                 					
			

						 $scope.league1=arc_lg1;
					



                             }).error(function(data, status, headers, config) {
                            
                          });

						
	
$scope.country_fun=function(value)
{
	
	

	var res = value.split("-");

	
	window.location.href = './country.html?con_id='+res[1]+'&cnt_id='+res[0];
}
$scope.next_page=function(compe_id)
{
	window.location.href = './league_details.html?comp_id='+compe_id+'&cnt_id='+$scope.cnt_id;
}

	
$scope.next_pagec=function(compe_id)
{
	window.location.href = './cup_details.html?comp_id='+compe_id+'&cnt_id='+$scope.cnt_id;
}	 




  $http({
			  	
            	
          method  : 'POST',
		url  : '/get_competitions',
                data :{} ,
                headers : { 'Authorization':'Basic aGloaTI6aGloLyZ3ZSU=',
	                    'Accept': 'application/json'
			
                          },


        }).success(function(data, status, headers, config)
		{
			  $scope.comppe = data.datasportsgroup.competition;

  $scope.sk=[];
  Object.keys($scope.comppe).forEach(function (key)
							 	{   
									if($scope.comppe[key].$.name == 'WC Qualification')
									{
									var spz=' ';
									var add=(spz).concat($scope.comppe[key].$.area_name)
									$scope.sk[key]={name1:($scope.comppe[key].$.name).concat(add),comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};	
									}else if($scope.comppe[key].$.name == 'Division 2')
									{
									
									}
									else{
									     $scope.sk[key]={name1:$scope.comppe[key].$.name,comp_id:$scope.comppe[key].$.competition_id,format:$scope.comppe[key].$.format,area_name:$scope.comppe[key].$.area_name,area_id:$scope.comppe[key].$.area_id};
									   }
								});	

   
 

	 
	 $scope.searched = function(c_area,v_com,v_for) {
	
	
	
	 if(v_for == 'domestic_league' || v_for == 'domestic_super_league'){
					  window.location.href='./league_details.html?comp_id='+v_com+'&cnt_id='+c_area;					
					 }else if((v_for == 'international_cup' || v_for == 'international_super_cup') || (v_com == 18 || v_com == 19)){
						
						 window.location.href='./qualification_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else if((v_for == 'international_cup') || (v_com == 396 || v_com == 417)){
						
						window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }else{
						
						  window.location.href='./cup_details.html?comp_id='+v_com+'&cnt_id='+c_area;
					 }
	
	

	
      }
			
			
		
			

						
			

        }).error(function(data, status, headers, config) {
            
        });









 	
	})





	
	

function linkback()
{
	history.back();
	
	
		
}





function search_item(s){ alert(s);}
	
		
		
		



			
				