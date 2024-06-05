document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map and set its view to Vancouver's coordinates
    var map = L.map('map').setView([49.2827, -123.1207], 13);

    // Tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add Leaflet.markercluster plugin with custom options
    var markers = L.markerClusterGroup({
        maxClusterRadius: 40, // Adjust the clustering radius
        disableClusteringAtZoom: 16 // Disable clustering at zoom level 16 and higher
    });

    // Icon for homicide
    var homicideIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color: #e74c3c; width: 24px; height: 24px; color: #EEE5E6; text-align: center; border-radius: 50%; line-height: 24px;'>H</div>",
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    // Icon for missing persons
    var missingPersonIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color: #3498db; width: 24px; height: 24px; color: #FFF; text-align: center; border-radius: 50%; line-height: 24px;'>M</div>",
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    // Function to convert gender code to full name
    function getGenderFullName(gender) {
        switch (gender) {
            case 'F':
                return 'Female';
            case 'M':
                return 'Male';
            case 'T':
                return 'Trans';
            default:
                return 'Unknown';
        }
    }

    // Function for marker status
    function addMarker(lat, lng, name, age, gender, date, status, photoFilename, url, type = 'homicide') {
        var genderFullName = getGenderFullName(gender);
        var popupContent = `
            <div style="font-family: 'Courier New', monospace; display: flex; align-items: center;">
                <img src="photos/${photoFilename}" alt="${name}" style="width: 120px; height: 120px; margin-right: 15px;">
                <div>
                    <h3 style="margin: 0; font-size: 1.5em;"><a href="${url}" target="_blank">${name}</a></h3>
                    <p style="margin: 5px 0; font-size: 1.2em;">Age: ${age}</p>
                    <p style="margin: 5px 0; font-size: 1.2em;">Gender: ${genderFullName}</p>
                    <p style="margin: 5px 0; font-size: 1.2em;">Date: ${date}</p>
                    <p style="margin: 5px 0; font-size: 1.2em;">Status: ${status}</p>
                </div>
            </div>`;
        var icon = type === 'missing' ? missingPersonIcon : homicideIcon;
        var marker = L.marker([lat, lng], { icon: icon, type: type });
        marker.bindPopup(popupContent);
        marker.on('click', function () {
            this.setIcon(L.divIcon({
                className: 'custom-div-icon',
                html: this.options.icon.options.html,
                iconSize: [48, 48], 
                iconAnchor: [24, 24]
            }));
        });
        markers.addLayer(marker);
    }

    // All markers
    var allMarkers = [
        //Homicide
        { lat: 49.249934, lng: -123.123536, name: "Glenna Sowan", age: 25, gender: "F", date: "Sep/30/1988", status: "unsolved", photoFilename: "glenna.png", url: "https://www.vpdcoldcases.ca/glenna-sowan/", type: "homicide" },
        { lat: 49.225525, lng: -123.079975, name: "Lisa Gavin", age: 21, gender: "F", date: "Mar/31/2022", status: "unsolved", photoFilename: "lisa.png", url: "https://www.vpdcoldcases.ca/lisa-gavin/", type: "homicide" },
        { lat: 49.278893, lng: -123.117194, name: "Chantel Gillade", age: 28, gender: "F", date: "Nov/08/2016", status: "unsolved", photoFilename: "chantal.png", url: "https://www.vpdcoldcases.ca/chantel-gillade/", type: "homicide" },
        { lat: 49.277553, lng: -123.059672, name: "Mary O'Donnell", age: 53, gender: "F", date: "Jul/28/1988", status: "unsolved", photoFilename: "mary.png", url: "https://www.vpdcoldcases.ca/mary-odonnell/", type: "homicide" },
        { lat: 49.222596, lng: -123.139916, name: "Mayvette Monzon", age: 31, gender: "F", date: "Sep/23/2005", status: "unsolved", photoFilename: "mayvette.png", url: "https://www.vpdcoldcases.ca/mayvette-monzon/", type: "homicide" },
        { lat: 49.221865, lng: -123.084952, name: "David, Helen, and Dorothy Paul", age: "Various", gender: "Mixed", date: "Dec/04/1958", status: "unsolved", photoFilename: "pauls.png", url: "https://www.vpdcoldcases.ca/the-pauls/", type: "homicide" },
        { lat: 49.283073, lng: -123.095238, name: "Melanie Thomson", age: 36, gender: "F", date: "Sep/2010", status: "unsolved", photoFilename: "melanie.png", url: "https://www.vpdcoldcases.ca/melanie-thomson/", type: "homicide" },
        { lat: 49.282937, lng: -123.132868, name: "Craig Abrahams", age: 28, gender: "M", date: "Dec/18/1995", status: "unsolved", photoFilename: "craig.png", url: "https://www.vpdcoldcases.ca/craig-abrahams/", type: "homicide" },
        { lat: 49.254026, lng: -123.146359, name: "Karen-Lee Taylor", age: 19, gender: "F", date: "Aug/24/1990", status: "unsolved", photoFilename: "karen.png", url: "https://www.vpdcoldcases.ca/karen-lee-taylor/", type: "homicide" },
        { lat: 49.220002, lng: -123.070745, name: "Cathy Berard", age: 61, gender: "F", date: "Jul/04/1996", status: "unsolved", photoFilename: "cathy.png", url: "https://www.vpdcoldcases.ca/cathy-berard/", type: "homicide" },
        { lat: 49.288506, lng: -123.122007, name: "Richard Chacon", age: 31, gender: "M", date: "Jul/25/1999", status: "unsolved", photoFilename: "richard.png", url: "https://www.vpdcoldcases.ca/richard-chacon/", type: "homicide" },
        { lat: 49.219400, lng: -123.048525, name: "Willene Chong", age: 76, gender: "F", date: "Sep/11/2008", status: "unsolved-Arson", photoFilename: "willene.png", url: "https://www.vpdcoldcases.ca/willene-chong/", type: "homicide" },
        { lat: 49.206313, lng: -123.140002, name: "Jillian Fuller", age: 28, gender: "F", date: "Mar/04/1993", status: "unsolved", photoFilename: "jillian.png", url: "https://www.vpdcoldcases.ca/jillian-fuller/", type: "homicide" },
        { lat: 49.257016, lng: -123.101259, name: "Evan Garber", age: 59, gender: "M", date: "Apr/28/2006", status: "unsolved", photoFilename: "evan.png", url: "https://www.vpdcoldcases.ca/evan-garber/", type: "homicide" },
        { lat: 49.282615, lng: -123.114091, name: "Kristin Gurholt", age: 34, gender: "F", date: "Sep/04/1981", status: "unsolved", photoFilename: "krisitin.png", url: "https://www.vpdcoldcases.ca/kristin-gurholt/", type: "homicide" },
        { lat: 49.265944, lng: -123.179004, name: "Sheila Henry", age: 26, gender: "F", date: "Feb/05/1993", status: "unsolved", photoFilename: "sheila.png", url: "https://www.vpdcoldcases.ca/sheila-henry/", type: "homicide" },
        //Missing Person
        { lat: 49.699317, lng: -124.986727, name: "David Phillips", age: 53, gender: "M", date: "May/08/2024", status: "missing", photoFilename: "david_p.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=84180", type: "missing" },
        { lat: 49.164803, lng: -123.944156, name: "Alysha-Nicole Dickenson", age: 30, gender: "F", date: "May/20/2024", status: "missing", photoFilename: "alysha_n.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=876&languageId=1&contentId=84127", type: "missing" },
        { lat: 50.233355, lng: -121.580019, name: "Patricia Quinn", age: 33, gender: "F", date: "Jul/10/2008", status: "missing", photoFilename: "patricia_q.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=5535", type: "missing" },
        { lat: 53.917443, lng: -122.759891, name: "Barry Blain Seymour", age: 32, gender: "M", date: "May/26/2012", status: "missing", photoFilename: "barry_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2113&languageId=1&contentId=25878", type: "missing" },
        { lat: 52.975392, lng: -122.503489, name: "Caitlin Murray", age: 21, gender: "F", date: "Sep/30/2013", status: "missing", photoFilename: "caitlin_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=31937", type: "missing" },
        { lat: 49.193252, lng: -122.856429, name: "Nicholas Rubini", age: 19, gender: "M", date: "Jan/22/2016", status: "missing", photoFilename: "nicholas_r.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=45001", type: "missing" },
        { lat: 49.206943, lng: -122.668407, name: "Kyonghee Kim", age: 54, gender: "F", date: "Oct/05/2016", status: "missing", photoFilename: "kyonghee_k.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=48552", type: "missing" },
        { lat: 50.837248, lng: -118.978714, name: "Nicole Bell", age: 31, gender: "F", date: "Sep/02/2017", status: "missing", photoFilename: "nicole_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=52536", type: "missing" },
        { lat: 54.786405, lng: -127.142034, name: "Frances Brown", age: 53, gender: "F", date: "Oct/14/2017", status: "missing", photoFilename: "frances_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=53040", type: "missing" },
        { lat: 49.322480, lng: -124.308755, name: "Carmel Gilmour", age: 36, gender: "F", date: "Nov/15/2017", status: "missing", photoFilename: "carmel_g.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=53381", type: "missing" },
        { lat: 49.190709, lng: -122.812274, name: "Danny Bayer", age: 48, gender: "M", date: "Nov/15/2018", status: "missing", photoFilename: "danny_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=54719", type: "missing" },
        { lat: 49.158522, lng: -121.953659, name: "Kristofer Shawn Couture", age: 25, gender: "M", date: "May/29/2019", status: "missing", photoFilename: "kristofer_s.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=60087", type: "missing" },
        { lat: 54.552081, lng: -130.433262, name: "Lawrence Maitland", age: 42, gender: "M", date: "Jul/17/2019", status: "missing", photoFilename: "lawrence_d.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=60772", type: "missing" },
        { lat: 49.108835, lng: -122.840730, name: "Kenny Tran", age: 21, gender: "M", date: "Feb/19/2020", status: "missing", photoFilename: "kenny_t.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=63415", type: "missing" },
        { lat: 56.246489, lng: -120.858202, name: "William Bird", age: 35, gender: "M", date: "Jul/12/2020", status: "missing", photoFilename: "william_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=65384", type: "missing" },
        { lat: 55.340205, lng: -123.094842, name: "Allan Troy Baker", age: 36, gender: "M", date: "Aug/15/2020", status: "missing", photoFilename: "allan_t.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=65630", type: "missing" },
        { lat: 53.902274, lng: -122.756839, name: "Jack Family", age: "Various", gender: "Various", date: "Aug/02/1989", status: "missing", photoFilename: "jack_family.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2113&languageId=1&contentId=65770", type: "missing" },
        { lat: 49.190883, lng: -122.801096, name: "John Wayne Luste", age: 23, gender: "M", date: "Nov/05/2020", status: "missing", photoFilename: "john_w.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=66745", type: "missing" },
        { lat: 49.153203, lng: -123.889703, name: "Prabhraj Sekhon", age: 24, gender: "M", date: "Apr/01/2021", status: "missing", photoFilename: "prabhraj_s.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=69022", type: "missing" },
        { lat: 54.310258, lng: -130.310642, name: "Shawn Weaver", age: 43, gender: "M", date: "Aug/21/2021", status: "missing", photoFilename: "shawn_w.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=71109", type: "missing" },
        { lat: 49.242994, lng: -123.015774, name: "Reshmi Mani", age: 52, gender: "F", date: "Jan/01/2022", status: "missing", photoFilename: "reshmi_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2114&languageId=1&contentId=73012", type: "missing" },
        { lat: 59.364813, lng: -129.145555, name: "Joseph Thomas Cheif", age: 42, gender: "M", date: "Jun/14/2022", status: "missing", photoFilename: "joseph_t.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=75470", type: "missing" },
        { lat: 49.233289, lng: -124.807518, name: "Amber Manthorne", age: 40, gender: "F", date: "Jul/07/2022", status: "missing", photoFilename: "amber_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=75696", type: "missing" },
        { lat: 50.125877, lng: -122.935268, name: "Colin Taylor", age: 39, gender: "M", date: "Jul/14/2022", status: "missing", photoFilename: "colin_t.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=75777", type: "missing" },
        { lat: 49.313158, lng: -123.081883, name: "George Michas", age: 74, gender: "M", date: "Jul/27/2022", status: "missing", photoFilename: "george_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2120&languageId=1&contentId=75957", type: "missing" },
        { lat: 50.392354, lng: -120.328005, name: "Dean Kelly Morrison", age: 44, gender: "M", date: "Oct/22/2013", status: "missing", photoFilename: "dean_k_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=76025", type: "missing" },
        { lat: 49.098054, lng: -117.272467, name: "Harsha Paladugu", age: 30, gender: "M", date: "Jul/27/2022", status: "missing", photoFilename: "harsa_p.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=76006", type: "missing" },
        { lat: 50.115475, lng: -122.948246, name: "Jonathan White", age: 35, gender: "M", date: "May/22/2022", status: "missing", photoFilename: "jonathan_w.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=76040", type: "missing" },
        { lat: 56.324977, lng: -121.037996, name: "Denny Poole", age: 15, gender: "M", date: "Mar/12/2026", status: "missing", photoFilename: "denny_p.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=77023", type: "missing" },
        { lat: 49.535474, lng: -119.624403, name: "Trevor Batoche", age: 37, gender: "M", date: "Mar/2019", status: "missing", photoFilename: "trevor_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=77134", type: "missing" },
        { lat: 54.373876, lng: -126.723439, name: "Leon Sinclair", age: 56, gender: "M", date: "Nov/2021", status: "missing", photoFilename: "leon_s.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=77153", type: "missing" },
        { lat: 56.257525, lng: -120.847537, name: "Stacey Lynn Rogers", age: 17, gender: "F", date: "Apr/20/1988", status: "missing", photoFilename: "stacey_l_r.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=77215", type: "missing" },
        { lat: 51.291707, lng: -116.963149, name: "Xiao Hua (Christina) Jiang", age: 53, gender: "F", date: "May/03/2022", status: "missing", photoFilename: "xiao_h.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=77268", type: "missing" },
        { lat: 49.147451, lng: -122.316132, name: "Daniel Halak", age: 84, gender: "M", date: "Nov/09/2020", status: "missing", photoFilename: "daniel_h.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2119&languageId=1&contentId=77616", type: "missing" },
        { lat: 52.359647, lng: -126.722864, name: "Carl Schooner", age: 30, gender: "M", date: "Dec/06/2022", status: "missing", photoFilename: "carl_s.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=77673", type: "missing" },
        { lat: 49.258676, lng: -124.810992, name: "Scott Bezanson", age: 51, gender: "M", date: "Dec/02/2022", status: "missing", photoFilename: "scott_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=77796", type: "missing" },
        { lat: 50.943323, lng: -118.167522, name: "Joshua Jeffs", age: 23, gender: "M", date: "Dec/19/2013", status: "missing", photoFilename: "charlene_e.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2121&languageId=1&contentId=77834", type: "missing" },
        { lat: 48.447539, lng: -123.495582, name: "James Cheetham", age: 60, gender: "M", date: "Jan/01/2013", status: "missing", photoFilename: "james_c.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2127&languageId=1&contentId=77986", type: "missing" },
        { lat: 49.245443, lng: -122.879843, name: "Andrea Mcintyre", age: 45, gender: "F", date: "Mar/02/2023", status: "missing", photoFilename: "andrea_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2115&languageId=1&contentId=78682", type: "missing" },
        { lat: 49.162706, lng: -122.773236, name: "Joseph Chen", age: 14, gender: "M", date: "Mar/02/2023", status: "missing", photoFilename: "joseph_c.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=78700", type: "missing" },
        { lat: 50.113108, lng: -120.793452, name: "Miguel Mack", age: 24, gender: "M", date: "Feb/27/2023", status: "missing", photoFilename: "miguel_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=78725", type: "missing" },
        { lat: 51.475631, lng: -118.457471, name: "Bradley James Cadden", age: 39, gender: "M", date: "Mar/05/2023", status: "missing", photoFilename: "bradley_j.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2121&languageId=1&contentId=78826", type: "missing" },
        { lat: 55.758604, lng: -120.224885, name: "Darylyn Supernant", age: 29, gender: "F", date: "Mar/15/2023", status: "missing", photoFilename: "darylyn_s.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=78930", type: "missing" },
        { lat: 49.234098, lng: -121.958707, name: "Patrick Jordan", age: 48, gender: "M", date: "Mar/30/2023", status: "missing", photoFilename: "harrison_r.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=79019", type: "missing" },
        { lat: 48.650137, lng: -123.556991, name: "Bernard Fournier", age: 62, gender: "M", date: "Apr/16/2023", status: "missing", photoFilename: "bernard_f.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=79313", type: "missing" },
        { lat: 53.946118, lng: -124.109048, name: "Jay Preston Raphael", age: 27, gender: "M", date: "Feb/26/2023", status: "missing", photoFilename: "jay_p.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=79331", type: "missing" },
        { lat: 52.973439, lng: -122.506124, name: "Bryan Twan", age: 57, gender: "M", date: "Jun/06/2016", status: "missing", photoFilename: "bryan_t.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=79823", type: "missing" },
        { lat: 49.379690, lng: -123.338050, name: "Michael Vanrookhuyzen", age: 45, gender: "M", date: "Jun/02/2022", status: "missing", photoFilename: "Michael_v.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=80191", type: "missing" },
        { lat: 50.684513, lng: -120.286383, name: "Fred Yellow Old Woman", age: 54, gender: "M", date: "Jun/14/2011", status: "missing", photoFilename: "fred_y.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=80445", type: "missing" },
        { lat: 49.130898, lng: -123.923900, name: "Christopher Massingham", age: 53, gender: "M", date: "Jun/27/2023", status: "missing", photoFilename: "christopher_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=80401", type: "missing" },
        { lat: 49.152918, lng: -123.118640, name: "Ryan Liu", age: 22, gender: "M", date: "Jul/09/2023", status: "missing", photoFilename: "ryan_l.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2122&languageId=1&contentId=80484", type: "missing" },
        { lat: 50.673002, lng: -120.305667, name: "Jordan Dean Nande", age: 27, gender: "M", date: "Apr/01/2023", status: "missing", photoFilename: "jordan_n.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=80875", type: "missing" },
        { lat: 49.221910, lng: -123.005007, name: "Jiexiong 'Jackson' Xu", age: 28, gender: "M", date: "Aug/03/2023", status: "missing", photoFilename: "jie_x.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2114&languageId=1&contentId=80641", type: "missing" },
        { lat: 49.159007, lng: -121.958594, name: "Masoud Sanayei", age: 39, gender: "M", date: "Jun/16/2023", status: "missing", photoFilename: "masoud_s.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2114&languageId=1&contentId=80924", type: "missing" },
        { lat: 55.744837, lng: -120.224895, name: "Dave Daniel Domingo", age: 24, gender: "M", date: "Aug/29/2023", status: "missing", photoFilename: "dave_d.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=81092", type: "missing" },
        { lat: 50.252830, lng: -119.273871, name: "Blayne Ferguson", age: 27, gender: "M", date: "Sep/21/2023", status: "missing", photoFilename: "blayne_f.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=81349", type: "missing" },
        { lat: 49.464847, lng: -117.483672, name: "Cory Westcott", age: 34, gender: "M", date: "Aug/31/2023", status: "missing", photoFilename: "cory_w.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=81388", type: "missing" },
        { lat: 49.095566, lng: -116.501448, name: "Felix Ference", age: 58, gender: "M", date: "Oct/07/2023", status: "missing", photoFilename: "felix_f.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=81477", type: "missing" },
        { lat: 49.885355, lng: -119.493496, name: "Brett William Moore", age: 35, gender: "M", date: "Oct/23/2022", status: "missing", photoFilename: "brett_w.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=81926", type: "missing" },
        { lat: 50.066160, lng: -122.946248, name: "Robert McKean", age: 80, gender: "M", date: "Oct/09/2023", status: "missing", photoFilename: "rob_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=81530", type: "missing" },
        { lat: 49.755123, lng: -124.553488, name: "Mark Braunagel", age: 50-70, gender: "M", date: "Oct/15/2023", status: "missing", photoFilename: "mark_b.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=81758", type: "missing" },
        { lat: 49.206977, lng: -122.590196, name: "Rebecca Harbowy", age: 36, gender: "F", date: "Nov/23/2023", status: "missing", photoFilename: "rebecca_h.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2123&languageId=1&contentId=82036", type: "missing" },
        { lat: 55.246891, lng: -127.592855, name: "Sheldon Roderick McDonald", age: 46, gender: "M", date: "Nov/21/2023", status: "missing", photoFilename: "sheldon_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=82037", type: "missing" },
        { lat: 55.761822, lng: -120.237450, name: "Renee Didier", age: 40, gender: "F", date: "Dec/07/2023", status: "missing", photoFilename: "renee_d.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=82178", type: "missing" },
        { lat: 54.442270, lng: -124.251424, name: "Justin Joseph", age: 42, gender: "M", date: "Nov/09/2023", status: "missing", photoFilename: "justin_j.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=82454", type: "missing" },
        { lat: 50.209549, lng: -119.280306, name: "Robert Lee Baines", age: 83, gender: "M", date: "Jan/02/2024", status: "missing", photoFilename: "robert_l.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=82543", type: "missing" },
        { lat: 49.162574, lng: -122.857011, name: "Narinder Sandhu", age: 69, gender: "M", date: "Jan/03/2024", status: "missing", photoFilename: "narinder_s.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2126&languageId=1&contentId=82567", type: "missing" },
        { lat: 49.159116, lng: -121.958709, name: "Jamie Curtis Bristol", age: 41, gender: "M", date: "Jan/03/2024", status: "missing", photoFilename: "jamie_c.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=82605", type: "missing" },
        { lat: 49.263034, lng: -122.817725, name: "Le-Roi La France", age: 79, gender: "M", date: "Mar/20/1964", status: "missing", photoFilename: "le-roi.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2115&languageId=1&contentId=82698", type: "missing" },
        { lat: 55.760529, lng: -120.231231, name: "Cole Hosack", age: 24, gender: "M", date: "Jan/01/2024", status: "missing", photoFilename: "cole_h.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=82713", type: "missing" },
        { lat: 49.830684, lng: -124.526963, name: "Linda Diane Albert", age: 68, gender: "F", date: "Jan/06/2024", status: "missing", photoFilename: "linda_d.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=82721", type: "missing" },
        { lat: 53.918196, lng: -122.746832, name: "Billy-Jo Mindel", age: 36, gender: "F", date: "Jan/02/2024", status: "missing", photoFilename: "billy_j.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2113&languageId=1&contentId=82791", type: "missing" },
        { lat: 50.123287, lng: -120.760241, name: "Tara Moran", age: 27, gender: "F", date: "Feb/21/2024", status: "missing", photoFilename: "tara_m.jpg", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=2087&languageId=1&contentId=83132", type: "missing" },
        { lat: 49.162639, lng: -124.031310, name: "Gregory Nowosad", age: 65, gender: "M", date: "Mar/01/2024", status: "missing", photoFilename: "gregory_n.png", url: "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=876&languageId=1&contentId=83295", type: "missing" },
    ];

    allMarkers.forEach(function (markerData) {
        addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
    });

    // Add markers to the map
    map.addLayer(markers);

    // Filter buttons functionality
    document.getElementById('show-all').addEventListener('click', function () {
        markers.clearLayers();
        allMarkers.forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });

    document.getElementById('show-homicide').addEventListener('click', function () {
        markers.clearLayers();
        allMarkers.filter(function (markerData) {
            return markerData.type === 'homicide';
        }).forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });

    document.getElementById('show-missing').addEventListener('click', function () {
        markers.clearLayers();
        allMarkers.filter(function (markerData) {
            return markerData.type === 'missing';
        }).forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });

    // Age filter functionality
    document.getElementById('filter-age').addEventListener('click', function () {
        var minAge = parseInt(document.getElementById('min-age').value, 10);
        var maxAge = parseInt(document.getElementById('max-age').value, 10);
        if (isNaN(minAge) || isNaN(maxAge)) {
            alert("Please enter valid age values.");
            return;
        }

        markers.clearLayers();
        allMarkers.filter(function (markerData) {
            return markerData.age >= minAge && markerData.age <= maxAge;
        }).forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });

    // Gender filter functionality
    document.getElementById('filter-male').addEventListener('click', function () {
        markers.clearLayers();
        allMarkers.filter(function (markerData) {
            return markerData.gender === 'M';
        }).forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });

    document.getElementById('filter-female').addEventListener('click', function () {
        markers.clearLayers();
        allMarkers.filter(function (markerData) {
            return markerData.gender === 'F';
        }).forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });

    document.getElementById('filter-trans').addEventListener('click', function () {
        markers.clearLayers();
        allMarkers.filter(function (markerData) {
            return markerData.gender === 'T';
        }).forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });

    document.getElementById('filter-all-gender').addEventListener('click', function () {
        markers.clearLayers();
        allMarkers.forEach(function (markerData) {
            addMarker(markerData.lat, markerData.lng, markerData.name, markerData.age, markerData.gender, markerData.date, markerData.status, markerData.photoFilename, markerData.url, markerData.type);
        });
        map.addLayer(markers);
    });
});
