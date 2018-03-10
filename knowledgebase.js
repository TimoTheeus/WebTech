$(document).ready(function(){
    if($('body').hasClass('knowledgeBase')){
        loadHeaderImage();
        //load the navigation bar
        loadNavigation();
        
        //initialise a list for the main subjects in the knowledge base
        var knowledgeList = document.createElement("ul");
        //Create and load the behavior links
        var behaviorDiv = document.createElement("div");
        var behaviorHeader = document.createElement("h2");
        var behaviorLink = createElement('a','behaviorLink','Behavior','#');
        var behaviorList = createElement("ul","behaviorList","","");
        behaviorList.className += " hidden";
        behaviorHeader.appendChild(behaviorLink);
        behaviorDiv.appendChild(behaviorHeader);
        behaviorDiv.appendChild(behaviorList);
        var entry = document.createElement("li").appendChild(behaviorDiv);
        knowledgeList.appendChild(entry);
        $('body').append(knowledgeList);
        $('#behaviorLink').click(function(){
            $('#behaviorList').toggleClass('hidden');
        });
        behaviors.forEach(function(behavior) 
        {
            var div = document.createElement("div");
            var link = createElement('a',behavior.titleId,behavior.title,'#');
            div.appendChild(link);
            var content = createElement('p',behavior.contentId,behavior.content,"",'hidden');
            content.className += " hidden";
            div.appendChild(content);
            behaviorList.appendChild(div);

            $('#'+behavior.titleId).click(function(){
                behavior.extendDescription();
            });
        });
    }
});
function loadHeaderImage(){
    var image = document.createElement("img");
    image.setAttribute("src","images/header.png");
    var header = document.createElement("header");
    header.appendChild(image);
    $('body').append(header);
}
function loadNavigation(){
    var navigation = document.createElement("nav");
    navigation.appendChild(document.createElement("ul"));
    for(i=0; i<pageSources.length;i++){ 
        var liElement = document.createElement("li");
        liElement.appendChild(createElement('a','',pageTitles[i],pageSources[i] + '.html'));
        navigation.firstChild.appendChild(liElement);
    }
    $('body').append(navigation);
}
const pageSources = ["index","characteristics","habitat","behavior","pets","interest","knowledgebase"];
const pageTitles = ["General Information","Physical Characteristics","Habitat","Social Behavior and Diet","As Pets","Search Interest","Knowledge Base"];

function createElement(tag,id,text,link){
    var e = document.createElement(tag);
    e.id = id;
    if(tag == 'a'){
        e.href = link;
    }
    e.appendChild(document.createTextNode(text));
    return e;
}

const characteristics = {
    weight:"0.68-1.59kg",
    length:"24–41 cm",
    tailLength:"18-31cm",
    height:"~20.3cm"
}
class Behavior{

   constructor(){
    this.title = "Behavior"; 
    this.titleId = "behavior";
    this.content = null;
    this.contentId = "behaviorDescription"
   }
    extendDescription(){
        $('#'+this.contentId).toggleClass('hidden');
    }
}
class Social extends Behavior{

    constructor(){
        super();
        this.title = "Social Behavior";
        this.titleId = "socialTitle";
        this.contentId = "socialDescription";
        this.content = "Captive animals engage in highly social behaviors, typically resting while in contact with each other. \
        Males tend to show more aggression and urine-marking around the time of the females' estrous cycle. They have been seen to \
        bury feces by pushing soil with their noses or hind feet when in captivity. Much remains unknown of their basic ecology and \
        behavior in the wild, and a 2004 report by the International Union for Conservation of Nature stated that \"in-depth study \
        of the species, with particular emphasis on habitat use and population dynamics in the wild, is overdue.\"";
    }
}
class DietAndHunting extends Behavior{
    constructor(){
        super();
        this.content = "The fennec fox is an omnivore. Food sources include plants, rodents, insects, birds, eggs, and rabbits.\
        An individual can jump up to 2 ft (61 cm) high and 4 ft (120 cm) forward, which helps it catch prey and escape predators. \
        When hunting, large-eared foxes such as the fennec, or the bat-eared fox, can seem to stare at the ground while they rotate \
        their heads from side to side to pinpoint the location of prey, either underground or hidden above ground.";
        this.contentId = "dietDescription";
        this.title = "Diet and Hunting";
        this.titleId = "dietId"
    }
}
class Reproduction extends Behavior{
    constructor(){
        super();
        this.content = "Fennec foxes are social animals that mate for life, with each pair or family controlling their own territory\
        . Sexual maturity is reached at around nine months old. In the wild, mating usually occurs between January and February for \
        litters to be born between March and April. However, in captivity most litters are born later, between March and July, although\
         births can occur year-round. The species usually breeds only once each year. The copulation tie has been recorded as lasting\
          up to two hours and 45 minutes. Following mating, the male becomes very aggressive and protective of the female, providing\
           her with food during her pregnancy and lactation periods.";
        this.contentId = "reproductionDescription";
        this.title = "Reproduction";
        this.titleId = "reproductionId"
        }
}
const behaviors = [new Social(),new DietAndHunting(), new Reproduction()];