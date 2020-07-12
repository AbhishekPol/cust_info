const express = require("express");
const https = require("https");
const app = express();
app.get("/", function(req, res) {
  https.get("https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll", function(response) {
    console.log(response.statusCode);
    response.on("data",function(data)
    {
      //Head
        res.write("<!DOCTYPE html>");
        res.write("<html><head><title>Customer Information</title>");
        res.write('<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
        res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');

        //CSS
        res.write('<style type="text/css">');
        res.write('.image-flip:hover .backside, .image-flip.hover .backside {-webkit-transform: rotateY(0deg);-moz-transform: rotateY(0deg);-o-transform: rotateY(0deg);-ms-transform: rotateY(0deg);transform: rotateY(0deg);}');
        res.write('.image-flip:hover .frontside, .image-flip.hover .frontside {-webkit-transform: rotateY(180deg);-moz-transform: rotateY(180deg);-o-transform: rotateY(180deg);transform: rotateY(180deg);}');
        res.write('.image-flip {margin-bottom:200px;width: 300px;height: 250px;}');
        res.write('.mainflip {-webkit-transition: 1s;-webkit-transform-style: preserve-3d;-ms-transition: 1s;-moz-transition: 1s;-moz-transform: perspective(1000px);-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;transition: 1s;transform-style: preserve-3d;position: relative;}');
        res.write('.frontside, .backside {-webkit-backface-visibility: hidden;-moz-backface-visibility: hidden;-ms-backface-visibility: hidden;backface-visibility: hidden;-webkit-transition: 1s;-webkit-transform-style: preserve-3d;-moz-transition: 1s;-moz-transform-style: preserve-3d;-o-transition: 1s;-o-transform-style: preserve-3d;-ms-transition: 1s;-ms-transform-style: preserve-3d;transition: 1s;transform-style: preserve-3d;position: absolute;top: 0;left: 0;}');
        res.write('.frontside {-webkit-transform: rotateY(0deg);-ms-transform: rotateY(0deg);z-index: 2;}');
        res.write('.backside {background: white;-webkit-transform: rotateY(-180deg);-moz-transform: rotateY(-180deg);-o-transform: rotateY(-180deg);-ms-transform: rotateY(-180deg);transform: rotateY(-180deg);}');
        res.write('.card, .card-img-top {border-radius: 0;}');
        res.write('</style></head>')

        //Body
        res.write('<body>');
        res.write('<div class="table-responsive-md"><table class="table">');



        const customerData=JSON.parse(data);
        var active=Array();
        var left=Array();
        var onboarded=Array();
        list=[]
        for(var i=0;i<customerData.list.length;i++)
        {
          var custData={}
          custData.id=customerData.list[i].id;
          custData.name=customerData.list[i].name;
          custData.img=customerData.list[i].img;
          custData.gender=customerData.list[i].gender;
          custData.age=customerData.list[i].age;
          var parts =customerData.list[i].date.split('/');
          var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
          custData.date=new Date(mydate);
          custData.status=customerData.list[i].status;
          list.push(custData)
      }
      const sortedActivities = list.sort((a, b) => a.date - b.date)
      var counter=0;
      for(i=0;i<list.length;i++)
      {
          if(list[i].status=="active")
          {
              active.push(i);
          }
          else if(list[i].status=="left")
          {
              left.push(i);
          }
          else
          {
              onboarded.push(i);
          }
     }
     res.write('<thead><tr><th class="text-light bg-dark">Active Status Customers</th></tr></thead><tbody>');
     for(i=0;i<active.length;i++)
     {
           if(i==0||i%3==0 )
           {
             res.write('<tr>');
             counter++;
           }
           res.write('<td>')
           res.write('<div class="image-flip" ontouchstart="this.classList.toggle(\'hover\');"><div class="mainflip">');
           res.write('<div class="frontside"><div class="card" style="width:20rem;">');
           //--------------------------------------------------------------------------------------------------------------
           res.write("<img style='object-fit:fill;height:248px;' class='card-img-top img- fluid' src='"+list[active[i]].img+"' alt='Profile Pic Not Found' >");
           //--------------------------------------------------------------------------------------------------------------------;)
           if(list[active[i]].gender=="m")
              res.write('<div class="card-body"><h4 class="card-title">'+list[active[i]].name+'</h4><p class="card-text">Gender : Male</p>');
           else
              res.write('<div class="card-body"><h4 class="card-title">'+list[active[i]].name+'</h4><p class="card-text">Gender : Female</p>');
           res.write('</div></div></div>');

           res.write('<div class="backside"><div class="card" style="width:20rem;">');
           res.write('<div class="card-header">ID : '+list[active[i]].id+'</div>');
           res.write('<div class="card-body"><p class="card-text"><br>Name : '+list[active[i]].name+'<br>');
           res.write('Age : '+list[active[i]].age+'<br>Date : '+list[active[i]].date.toLocaleDateString()+'<br>');
           if(list[active[i]].gender=="m")
              res.write('Gender : Male<br><br><br>');
          else
              res.write('Gender : Female<br>');
           res.write('</p></div>');
           res.write('<div class="card-footer">Status : Active<br></div>');
           res.write('</div></div></div></div>');
           res.write('</td>')
           if(counter==3)
           {
             res.write('</tr>');
             counter=0;
           }
          //res.write("<html><h5>"+list[active[i]].name+"     "+list[active[i]].date+"</h5><br/></html>");
     }
     res.write('</tbody>');
     //LEFT Status
     counter=0;
     res.write('<thead><tr><th class="text-light bg-dark">Left Status Customers</th></tr></thead><tbody>');
     for(i=0;i<left.length;i++)
     {
           if(i==0||i%3==0 )
           {
             res.write('<tr>');
             counter++;
           }
           res.write('<td>')
           res.write('<div class="image-flip" ontouchstart="this.classList.toggle(\'hover\');"><div class="mainflip">');
           res.write('<div class="frontside"><div class="card" style="width:20rem;">');
           //--------------------------------------------------------------------------------------------------------------
           res.write("<img style='object-fit:fill;height:248px;' class='card-img-top img- fluid' src='"+list[left[i]].img+"' alt='Profile Pic Not Found'>");
           //--------------------------------------------------------------------------------------------------------------------;)
           if(list[left[i]].gender=="m")
              res.write('<div class="card-body"><h4 class="card-title">'+list[left[i]].name+'</h4><p class="card-text">Gender : Male</p>');
           else
              res.write('<div class="card-body"><h4 class="card-title">'+list[left[i]].name+'</h4><p class="card-text">Gender : Female</p>');
           res.write('</div></div></div>');

           res.write('<div class="backside"><div class="card" style="width:20rem;">');
           res.write('<div class="card-header">ID : '+list[left[i]].id+'</div>');
           res.write('<div class="card-body"><p class="card-text"><br>Name : '+list[left[i]].name+'<br>');
           res.write('Age : '+list[left[i]].age+'<br>Date : '+list[left[i]].date.toLocaleDateString()+'<br>');
           if(list[left[i]].gender=="m")
              res.write('Gender : Male<br><br><br>');
          else
              res.write('Gender : Female<br>');
           res.write('</p></div>');
           res.write('<div class="card-footer">Status : Left<br></div>');
           res.write('</div></div></div></div>');
           res.write('</td>')
           if(counter==3)
           {
             res.write('</tr>');
             counter=0;
           }
     }

     counter=0;
     res.write('<thead><tr><th class="text-light bg-dark">Onboarded Status Customers</th></tr></thead><tbody>');
     for(i=0;i<onboarded.length;i++)
     {
           if(i==0||i%3==0 )
           {
             res.write('<tr>');
             counter++;
           }
           res.write('<td>')
           res.write('<div class="image-flip" ontouchstart="this.classList.toggle(\'hover\');"><div class="mainflip">');
           res.write('<div class="frontside"><div class="card" style="width:20rem;">');
           //--------------------------------------------------------------------------------------------------------------
           res.write("<img style='object-fit:fill;height:248px;' class='card-img-top img- fluid' src='"+list[onboarded[i]].img+"' alt='Profile Pic Not Found'>");
           //--------------------------------------------------------------------------------------------------------------------;)
           if(list[onboarded[i]].gender=="m")
              res.write('<div class="card-body"><h4 class="card-title">'+list[onboarded[i]].name+'</h4><p class="card-text">Gender : Male</p>');
           else
              res.write('<div class="card-body"><h4 class="card-title">'+list[onboarded[i]].name+'</h4><p class="card-text">Gender : Female</p>');
           res.write('</div></div></div>');

           res.write('<div class="backside"><div class="card" style="width:20rem;">');
           res.write('<div class="card-header">ID : '+list[onboarded[i]].id+'</div>');
           res.write('<div class="card-body"><p class="card-text"><br>Name : '+list[onboarded[i]].name+'<br>');
           res.write('Age : '+list[onboarded[i]].age+'<br>Date : '+list[onboarded[i]].date.toLocaleDateString()+'<br>');
           if(list[onboarded[i]].gender=="m")
              res.write('Gender : Male<br><br><br>');
          else
              res.write('Gender : Female<br>');
           res.write('</p></div>');
           res.write('<div class="card-footer">Status : Onboarded<br></div>');
           res.write('</div></div></div></div>');
           res.write('</td>')
           if(counter==3)
           {
             res.write('</tr>');
             counter=0;
           }
          //res.write("<html><h5>"+list[active[i]].name+"     "+list[active[i]].date+"</h5><br/></html>");
     }
      res.write('</tbody></table></div>');
      res.write('</body>');
      res.write('</html>');
      res.send();
    });
  });

})
app.listen(3000, function() {
  console.log("Server is initialized to port 3000");
})
