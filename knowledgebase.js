$(document).ready(function(){
    if($('body').hasClass('knowledgeBase')){
        initialiseHeaders();
        characteristics.forEach(function(char){
            var div = char.extendedContentObject;
            document.getElementById("characList").appendChild(div);
            addClickInteraction(char.titleId,char.contentId);
        });
        behaviors.forEach(function(behavior) 
        {
            var div = behavior.extendedContentObject;
            document.getElementById("behaviorList").appendChild(div);
            addClickInteraction(behavior.titleId,behavior.contentId);
        });
    }
});
function initialiseHeaders(){
    //initialise a list for the main topics in the knowledge base
    var knowledgeList = document.createElement("ul");
    //Create link entries for the main topics
    general = new General();
    var generalEntry = general.extendedContentObject;
    var behaviorEntry= createTopicHeader("behaviorLink","Behavior","behaviorList");
    var characEntry = createTopicHeader("characLink","Physical Characteristics","characList");
    knowledgeList.appendChild(generalEntry);
    knowledgeList.appendChild(characEntry);
    knowledgeList.appendChild(behaviorEntry);
    $('body').append(knowledgeList);
    addClickInteraction(general.titleId,general.contentId);
    addClickInteraction("characLink","characList");
    addClickInteraction("behaviorLink","behaviorList");
}

function createTopicHeader(linkId,headerTitle,listId,){
    var div = document.createElement("div");
    var header = document.createElement("h2");
    var link = createElement('a',linkId,headerTitle,'#');
    var list = createElement("ul",listId,"","");
    list.className += " hidden";
    header.appendChild(link);
    div.appendChild(header);
    div.appendChild(list);
    var entry = document.createElement("li").appendChild(div);
    return entry;
}
function createElement(tag,id,text,link){
    var e = document.createElement(tag);
    if(id!=''){ 
    e.id = id;
    }
    if(tag == 'a'){
        e.href = link;
    }
    e.appendChild(document.createTextNode(text));
    return e;
}

function addClickInteraction(titleId, contentId){
    $('#'+titleId).click(function(){
        $('#'+contentId).toggleClass('hidden');
    });
}
class Topic{
    constructor(){
        this.title = "";
        this.titleId = "";
        this.content = "";
        this.contentId = "";
    }
    get extendedContentObject(){
        var div = document.createElement("div");
        var link = createElement('a',this.titleId,this.title,'#');
        div.appendChild(link);
        var content = createElement('p',this.contentId,this.content,"");
        content.className += " hidden";
        div.appendChild(content);
        return div;
    }
}
class General extends Topic{
    constructor(){
        super();
        this.title = "General Information";
        this.titleId = "general"
        this.content = "The fennec fox or fennec (Vulpes zerda) is a small nocturnal fox found in the Sahara of North Africa, the Sinai\
         Peninsula and the Arabian desert. Its most distinctive feature is its unusually large ears. The fennec is the smallest species\
          of canid. Its coat, ears, and kidney functions have adapted to high-temperature, low-water, desert environments. Also, its \
          hearing is sensitive enough to hear prey moving underground. It mainly eats insects, small mammals, and birds.The fennec has\
           a life span of up to 14 years in captivity. Its main predators are the African varieties of eagle owl. Families of fennecs \
           dig out dens in the sand for habitation and protection, which can be as large as 120 m² (1,292 sq ft) and adjoin the dens \
           of other families.";
        this.contentId = "characteristicsContent"
    }
    get extendedContentObject(){
        var div = document.createElement("div");
        var header = document.createElement("h2");
        var link = createElement('a',this.titleId,this.title,'#');
        header.appendChild(link);
        div.appendChild(header);
        var content = createElement('p',this.contentId,this.content,"");
        content.className += " hidden";
        div.appendChild(content);
        return div;
    }
}
class Characteristics extends Topic{
    
    constructor(){
        super();
        this.title = "Characteristics";
        this.titleId = "characteristics"
        this.content = "";
        this.contentId = "characteristicsContent"
    }
}

class Appearance extends Characteristics{
    
    constructor(){
        super();
        this.title = "Appearance";
        this.titleId = "appearance"
        this.content = "The coat is often a cream color and fluffy. The fennec's characteristic ears are the largest among all \
        foxes relative to body size. The soles of its feet are protected from the hot desert sand by thick fur."
        this.contentId = "appearanceContent"
    }
}
class Measurements extends Characteristics{
    constructor(){
        super();
        this.title = "Measurements";
        this.titleId = "measurements"
        this.content = measurements;
        this.contentId = "measurementsContent"
    }
    get extendedContentObject(){
            var div = document.createElement("div");
            var link = createElement('a',this.titleId,this.title,'#');
            div.appendChild(link);
            var table = document.createElement("table");
            table.className += " hidden";
            table.id= this.contentId;
            for(var i =0;i<measurements.length;i++){
                var row = "<tr><td>"+measurements[i].key + "</td><td>"+measurements[i].value+"</td></tr>";
                table.innerHTML+=row;
            }
            div.appendChild(table);
            return div;
    }
}

const measurements = [{key:"weight",value:"0.68-1.59kg"},{key:"length",value:"24-41m"},{key:"tailLength",value:"18-31cm"},
{key:"height",value:"~20.3cm"}];

class Behavior extends Topic{

   constructor(){
    super();
    this.title = "Behavior"; 
    this.titleId = "behavior";
    this.content = null;
    this.contentId = "behaviorDescription"
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
        behavior in the wild.";
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
const characteristics = [new Appearance(),new Measurements()];
