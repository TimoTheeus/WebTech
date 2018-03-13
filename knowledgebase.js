$(function() {
    initialiseHeaders();
    entries.forEach(entry => addSubTopics(entry.topics, entry.name + 'List'));
});
function initialiseHeaders() {
    //initialise a list for the main topics in the knowledge base
    var $knowledgeList = $('<ul>');
    //Create link entries for the main topics
    var general = new General();
    $knowledgeList.append(general.extendedContentObject);
    $('article').append($knowledgeList);
    addClickInteraction(general.titleId, general.contentId);
    entries.forEach(function(entry) {
        var linkId = entry.name + 'Link';
        var listId = entry.name + 'List';
        $knowledgeList.append(createTopicHeader(linkId, entry.title, listId));
        addClickInteraction(linkId, listId);
    });
}

function addSubTopics(array, parentListId) {
    array.forEach(function(subTopic) {
        $('#' + parentListId).append(subTopic.extendedContentObject);
        addClickInteraction(subTopic.titleId,subTopic.contentId);
    });
}
//create a list item with a link inside the header
function createTopicHeader(linkId, headerTitle, listId) {
    var $header = $('<h2>').append(createElement('a', linkId, headerTitle));
    var $list = $('<ul>').attr('id', listId).addClass('hidden')
    return $('<li>').append($('<div>').append($header).append($list));
}
//create an element and define its id and text content
function createElement(tag,id,text) {
    $element = $('<' + tag + '>').attr('id', id).text(text);
    if(tag == 'a'){
        $element.attr('href', 'javascript:void(0);');
    }
    return $element
}

//Add click interaction that hides/shows the content when clicking on the title
function addClickInteraction(titleId, contentId) {
    $('#'+titleId).click(function(){
        $('#'+contentId).toggleClass('hidden');
    });
}
class Topic {
    constructor() {
        this.title = "";
        this.titleId = "";
        this.content = "";
        this.contentId = "";
    }
    //a default content object for a topic
    get extendedContentObject() {
        return $('<div>').append(createElement('a', this.titleId, this.title))
            .append(createElement('p', this.contentId, this.content).addClass('hidden'));
    }
}
class General extends Topic {
    constructor() {
        super();
        this.title = 'General Information';
        this.titleId = 'general';
        this.content = 'The fennec fox or fennec (Vulpes zerda) is a small nocturnal fox found in the Sahara of North Africa, the Sinai\
         Peninsula and the Arabian desert. Its most distinctive feature is its unusually large ears. The fennec is the smallest species\
          of canid. Its coat, ears, and kidney functions have adapted to high-temperature, low-water, desert environments. Also, its \
          hearing is sensitive enough to hear prey moving underground. It mainly eats insects, small mammals, and birds.The fennec has\
           a life span of up to 14 years in captivity. Its main predators are the African varieties of eagle owl. Families of fennecs \
           dig out dens in the sand for habitation and protection, which can be as large as 120 m² (1,292 sq ft) and adjoin the dens \
           of other families.';
        this.contentId = 'characteristicsContent';
    }
    get extendedContentObject() {
        return $('<li>').append($('<div>').append($('<h2>').append(createElement('a', this.titleId, this.title))))
            .append(createElement('p', this.contentId, this.content).addClass('hidden'));
    }
}
class Habitat extends Topic {
}
class Region extends Habitat {
    constructor() {
        super();
        this.title = 'Region';
        this.titleId = 'region';
        this.contentId = 'regionContent';
    }
    //change the default content object to a figure
    get extendedContentObject(){
        var $figure = $('<figure>').append($('<img>').attr('src', 'images/location.png'))
            .append('<figcaption>The fennec fox lives in North Africa</figcaption>')
            .attr('id', this.contentId).addClass('hidden');
        return $('<div>').append(createElement('a', this.titleId, this.title)).append($figure);
    }
}
class Population extends Habitat {
    constructor() {
        super();
        this.title = 'Population';
        this.titleId = 'population';
        this.content = 'The fennec fox is classified as "least concern" on the IUCN Red List, and as a CITES Appendix II species: \
        species not necessarily threatened with extinction, but whose trade must be controlled to avoid utilization incompatible with \
        their survival.';
        this.contentId = 'populationContent';
    }
}
class Predators extends Habitat {
    constructor() {
        super();
        this.title = 'Predators';
        this.titleId = 'predators';
        this.content = 'The fennec fox\'s main predators are the various African varieties of eagle owl. Other possible predators include \
        caracals, jackals, striped hyenas, and the saluki, a greyhound-like domestic dog local to the area.';
        this.contentId = 'predatorsContent'
    }
}
class Characteristics extends Topic {
    constructor() {
        super();
        this.title = 'Characteristics';
        this.titleId = 'characteristics';
        this.content = '';
        this.contentId = 'characteristicsContent';
    }
}

class Appearance extends Characteristics {
    constructor() {
        super();
        this.title = 'Appearance';
        this.titleId = 'appearance';
        this.content = 'The coat is often a cream color and fluffy. The fennec\'s characteristic ears are the largest among all \
        foxes relative to body size. The soles of its feet are protected from the hot desert sand by thick fur.';
        this.contentId = 'appearanceContent';
    }
}
class Measurements extends Characteristics {
    constructor() {
        super();
        this.title = 'Measurements';
        this.titleId = 'measurements';
        this.content = {
            Weight: '0.68-1.59kg',
            Length: '24-41m',
            'Tail Length': '18-31cm',
            Height: '~20.3cm'
        };
        this.contentId = 'measurementsContent';
    }
    //change the default content object to a table
    get extendedContentObject() {
        var $table = $('<table>').attr('id', this.contentId).addClass('hidden');
        Object.keys(this.content).forEach(key =>
            $table.append(`<tr><td>${key}</td><td>${this.content[key]}</td></tr>`));
        return $('<div>').append(createElement('a', this.titleId, this.title)).append($table);
    }
}
class Behavior extends Topic { 
   constructor() {
       super();
       this.title = 'Behavior'; 
       this.titleId = 'behavior';
       this.content = null;
       this.contentId = 'behaviorDescription';
   }
}
class Social extends Behavior {
    constructor() {
        super();
        this.title = 'Social Behavior';
        this.titleId = 'socialTitle';
        this.contentId = 'socialDescription';
        this.content = 'Captive animals engage in highly social behaviors, typically resting while in contact with each other. \
        Males tend to show more aggression and urine-marking around the time of the females\' estrous cycle. They have been seen to \
        bury feces by pushing soil with their noses or hind feet when in captivity. Much remains unknown of their basic ecology and \
        behavior in the wild.';
    }
}
class DietAndHunting extends Behavior {
    constructor() {
        super();
        this.content = 'The fennec fox is an omnivore. Food sources include plants, rodents, insects, birds, eggs, and rabbits.\
        An individual can jump up to 2 ft (61 cm) high and 4 ft (120 cm) forward, which helps it catch prey and escape predators. \
        When hunting, large-eared foxes such as the fennec, or the bat-eared fox, can seem to stare at the ground while they rotate \
        their heads from side to side to pinpoint the location of prey, either underground or hidden above ground.';
        this.contentId = 'dietDescription';
        this.title = 'Diet and Hunting';
        this.titleId = 'dietId';
    }
}
class Reproduction extends Behavior {
    constructor() {
        super();
        this.content = 'Fennec foxes are social animals that mate for life, with each pair or family controlling their own territory\
        . Sexual maturity is reached at around nine months old. In the wild, mating usually occurs between January and February for \
        litters to be born between March and April. However, in captivity most litters are born later, between March and July, although\
         births can occur year-round. The species usually breeds only once each year. The copulation tie has been recorded as lasting\
          up to two hours and 45 minutes. Following mating, the male becomes very aggressive and protective of the female, providing\
           her with food during her pregnancy and lactation periods.';
        this.contentId = 'reproductionDescription';
        this.title = 'Reproduction';
        this.titleId = 'reproductionId';
        }
}
class Pets extends Topic {
    constructor() {
        super();
        this.content = 'The species is classified a "small wild/exotic canid" by the United States Department of Agriculture, \
        along with the coyote, dingo, jackal, and Arctic fox, and is considered the only species of fox, other than the Russian \
        domesticated red fox, which can properly be kept as a pet. Although it cannot be considered domesticated, it can be kept\
         in a domestic setting similar to dogs or cats.';
        this.contentId = 'petsContent';
        this.title = 'Fennec Foxes as Pets';
        this.titleId = 'petsId';
    }
}
var entries = [{
    topics: [new Appearance(), new Measurements()],
    name: 'charac',
    title: 'Physical Characteristics'
},{
    topics: [new Region(), new Population(), new Predators()],
    name: 'habitat',
    title: 'Habitat'
},{
    topics: [new Social(),new DietAndHunting(), new Reproduction()],
    name: 'behavior',
    title: 'Behavior'
},{
    topics: [new Pets()],
    name: 'pets',
    title: 'Pets'
}]