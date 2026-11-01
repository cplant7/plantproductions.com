/* ================= SENATE & ONTARIO DATA ================= */
// Senate: name|affiliation|province|appointed|retires|advised by   (sencanada.ca list view, read Oct 31 2026)
const SEN_RAW=`Adler, Charles S.|CSG|Manitoba|2024-08-16|2029-08-25|Trudeau
Anderson, Dawn|C|Northwest Territories|2018-12-12|2042-04-14|Trudeau
Arnold, Dawn|ISG|New Brunswick|2025-03-07|2041-04-23|Trudeau
Arnot, David M.|ISG|Saskatchewan|2021-07-29|2027-04-16|Trudeau
Ataullahjan, Salma|C|Ontario|2010-07-09|2027-04-29|Harper
Aucoin, Réjean|CSG|Nova Scotia|2023-10-31|2030-07-04|Trudeau
Audette, Michèle|PSG|Quebec|2021-07-29|2046-07-20|Trudeau
Batters, Denise|C|Saskatchewan|2013-01-25|2045-06-18|Harper
Bernard, Wanda Thomas|PSG|Nova Scotia|2016-11-10|2028-08-01|Trudeau
Black, Robert|CSG|Ontario|2018-02-15|2037-03-27|Trudeau
Boehm, Peter M.|ISG|Ontario|2018-10-03|2029-04-26|Trudeau
Boudreau, Victor|ISG|New Brunswick|2024-06-28|2045-05-03|Trudeau
Boyer, Yvonne|ISG|Ontario|2018-03-15|2028-10-25|Trudeau
Brazeau, Patrick|NA|Quebec|2009-01-08|2049-11-11|Harper
Burey, Sharon|CSG|Ontario|2022-11-21|2032-12-04|Trudeau
Cardozo, Andrew|PSG|Ontario|2022-11-21|2031-03-21|Trudeau
Carignan, Claude|C|Quebec|2009-08-27|2039-12-04|Harper
Clement, Bernadette|ISG|Ontario|2021-06-22|2040-05-17|Trudeau
Cormier, René|ISG|New Brunswick|2016-11-10|2031-04-27|Trudeau
Coyle, Mary|ISG|Nova Scotia|2017-12-04|2029-11-05|Trudeau
Cuzner, Rodger|PSG|Nova Scotia|2023-10-31|2030-11-04|Trudeau
Dalphond, Pierre J.|ISG|Quebec|2018-06-06|2029-05-01|Trudeau
Deacon, Colin|CSG|Nova Scotia|2018-06-15|2034-11-01|Trudeau
Deacon, Marty|ISG|Ontario|2018-02-15|2033-04-23|Trudeau
Dean, Tony|ISG|Ontario|2016-11-10|2028-08-19|Trudeau
Dhillon, Baltej S.|ISG|British Columbia|2025-02-07|2041-11-13|Trudeau
Downe, Percy E.|CSG|Prince Edward Island|2003-06-26|2029-07-08|Chrétien
Duncan, Pat|GRO|Yukon|2018-12-12|2035-04-08|Trudeau
Forest, Éric|ISG|Quebec|2016-11-21|2027-04-06|Trudeau
Francis, Brian|PSG|Prince Edward Island|2018-10-11|2032-09-28|Trudeau
Fridhandler, Daryl S.|PSG|Alberta|2024-08-30|2031-10-09|Trudeau
Gagné, Raymonde|NA|Manitoba|2016-04-01|2031-01-07|Trudeau
Galvez, Rosa|ISG|Quebec|2016-12-06|2036-06-21|Trudeau
Gerba, Amina|PSG|Quebec|2021-07-29|2036-03-14|Trudeau
Gignac, Clément|CSG|Quebec|2021-07-29|2030-05-07|Trudeau
Greenwood, Margo|ISG|British Columbia|2022-11-10|2028-09-02|Trudeau
Harder, Peter|PSG|Ontario|2016-03-23|2027-08-25|Trudeau
Hay, Katherine|PSG|Ontario|2025-03-07|2036-01-16|Trudeau
Hébert, Martine|ISG|Quebec|2025-02-07|2040-10-07|Trudeau
Henkel, Danièle|PSG|Quebec|2025-02-14|2031-01-16|Trudeau
Housakos, Leo|C|Quebec|2009-01-08|2043-01-10|Harper
Ince, Tony|CSG|Nova Scotia|2025-03-07|2032-12-16|Trudeau
Karetak-Lindell, Nancy|ISG|Nunavut|2024-12-19|2032-12-10|Trudeau
Kingston, Joan|ISG|New Brunswick|2023-10-31|2030-01-08|Trudeau
Klyne, Marty|PSG|Saskatchewan|2018-09-24|2032-03-06|Trudeau
LaBoucane-Benson, Patti|GRO|Alberta|2018-10-03|2044-02-20|Trudeau
Loffreda, Tony|ISG|Quebec|2019-07-22|2037-08-14|Trudeau
MacAdam, Jane|ISG|Prince Edward Island|2023-05-03|2032-03-01|Trudeau
MacDonald, Michael L.|C|Nova Scotia|2009-01-02|2030-05-04|Harper
Manning, Fabian|C|Newfoundland and Labrador|2011-05-25|2039-05-21|Harper
Martel, Richard|C|Quebec|2026-07-24|2036-03-23|Carney
Martin, Yonah|C|British Columbia|2009-01-02|2040-04-11|Harper
McBean, Marnie|ISG|Ontario|2023-12-20|2043-01-28|Trudeau
McCallum, Mary Jane|C|Manitoba|2017-12-04|2027-05-01|Trudeau
McNair, John M.|ISG|New Brunswick|2023-10-31|2032-06-03|Trudeau
Miville-Dechêne, Julie|PSG|Quebec|2018-06-20|2034-07-10|Trudeau
Mohamed, Farah|ISG|Ontario|2025-03-07|2045-07-05|Trudeau
Moncion, Lucie|ISG|Ontario|2016-11-10|2033-10-25|Trudeau
Moodie, Rosemary|ISG|Ontario|2018-12-12|2031-11-24|Trudeau
Moreau, Pierre|GRO|Quebec|2024-09-10|2032-12-12|Trudeau
Muggli, Tracy|PSG|Saskatchewan|2024-08-16|2040-09-18|Trudeau
Osler, Flordeliz (Gigi)|CSG|Manitoba|2022-09-26|2043-09-09|Trudeau
Oudar, Manuelle|ISG|Quebec|2024-02-13|2038-07-05|Trudeau
Ouellette, Rodney|NA|New Brunswick|2026-07-09|2040-10-02|Carney
Pate, Kim|ISG|Ontario|2016-11-10|2034-11-10|Trudeau
Patterson, Rebecca|CSG|Ontario|2022-11-21|2040-06-15|Trudeau
Petitclerc, Chantal|ISG|Quebec|2016-04-01|2044-12-15|Trudeau
Petten, Iris G.|GRO|Newfoundland and Labrador|2023-05-03|2034-02-05|Trudeau
Pitfield, Thomas|NA|Quebec|2026-09-18|2050-08-07|Carney
Poirier, Rose-May|C|New Brunswick|2010-02-28|2029-03-02|Harper
Prosper, Paul (PJ)|CSG|Nova Scotia|2023-07-06|2039-11-04|Trudeau
Pupatello, Sandra|GRO|Ontario|2025-03-07|2037-10-06|Trudeau
Quinn, Jim|C|New Brunswick|2021-06-22|2032-01-25|Trudeau
Ravalia, Mohamed-Iqbal|ISG|Newfoundland and Labrador|2018-06-01|2032-08-15|Trudeau
Ringuette, Pierrette|ISG|New Brunswick|2002-12-12|2030-12-31|Chrétien
Robinson, Mary|CSG|Prince Edward Island|2024-01-22|2045-08-03|Trudeau
Ross, Krista|CSG|New Brunswick|2023-10-31|2042-09-30|Trudeau
Senior, Paulette|ISG|Ontario|2023-12-20|2036-12-04|Trudeau
Simons, Paula|ISG|Alberta|2018-10-03|2039-09-07|Trudeau
Sorensen, Karen|PSG|Alberta|2021-07-29|2034-05-20|Trudeau
Surette, Allister|ISG|Nova Scotia|2024-12-19|2036-09-21|Trudeau
Tannas, Scott|CSG|Alberta|2013-03-25|2037-02-25|Harper
Tucker, Geeta|NA|Manitoba|2026-07-09|2046-05-02|Carney
Varone, Toni|ISG|Ontario|2023-12-20|2033-06-20|Trudeau
Verner, Josée|CSG|Quebec|2011-06-13|2034-12-30|Harper
Wells, David M.|C|Newfoundland and Labrador|2013-01-25|2037-02-28|Harper
Wells, Kristopher|PSG|Alberta|2024-08-30|2046-10-07|Trudeau
White, Judy A.|PSG|Newfoundland and Labrador|2023-07-06|2039-01-11|Trudeau
Wilson, Duncan|PSG|British Columbia|2025-02-28|2042-09-26|Trudeau
Woo, Yuen Pau|ISG|British Columbia|2016-11-10|2038-03-02|Trudeau
Youance, Suze|ISG|Quebec|2024-09-25|2045-08-11|Trudeau
Yussuff, Hassan|ISG|Ontario|2021-06-22|2031-12-15|Trudeau`;
const SEN_VACANT={"British Columbia":1,"Manitoba":1,"Newfoundland and Labrador":1,"Nova Scotia":1,"Ontario":3,"Quebec":4,"Saskatchewan":2};

// Ontario: name|riding|party  (ola.org Current MPPs, read Oct 31 2026). "Hon." = member of the Executive Council (or the Speaker)
const ON_RAW=`Hon. Peter Bethlenfalvy|Pickering—Uxbridge|pc
Tyler Allsopp|Bay of Quinte|pc
Deepak Anand|Mississauga—Malton|pc
Teresa J. Armstrong|London—Fanshawe|ndp
Aris Babikian|Scarborough—Agincourt|pc
Robert Bailey|Sarnia—Lambton|pc
Jeff Beattie|Hamilton East—Stoney Creek|pc
Jessica Bell|University—Rosedale|ndp
Stephen Blais|Orléans|olp
Will Bouma|Brantford—Brant|pc
Guy Bourgouin|Mushkegowuk—James Bay|ndp
Stephanie Bowman|Don Valley West|olp
Bobbi Ann Brady|Haldimand—Norfolk|ind
Ric Bresee|Hastings—Lennox and Addington|pc
Jeff Burch|Niagara Centre|ndp
Hon. Paul Calandra|Markham—Stouffville|pc
Rob Cerjanec|Ajax|olp
Hon. Raymond Sung Joon Cho|Scarborough North|pc
Hon. Stan Cho|Willowdale|pc
Monica Ciriello|Hamilton Mountain|pc
Aislinn Clancy|Kitchener Centre|gpo
Hon. Steve Clark|Leeds—Grenville—Thousand Islands and Rideau Lakes|pc
Lorne Coe|Whitby|pc
Lucille Collard|Ottawa—Vanier|olp
Hon. Michelle Cooper|Eglinton—Lawrence|pc
Hon. Stephen Crawford|Oakville|pc
Rudy Cuzzetto|Mississauga—Lakeshore|pc
George Darouze|Carleton|pc
Billy Denault|Renfrew—Nipissing—Pembroke|pc
Jess Dixon|Kitchener South—Hespeler|pc
Andrew Dowie|Windsor—Tecumseh|pc
Hon. Doug Downey|Barrie—Springwater—Oro-Medonte|pc
Hon. Jill Dunlop|Simcoe North|pc
Lee Fairclough|Etobicoke—Lakeshore|olp
Hon. Victor Fedeli|Nipissing|pc
Catherine Fife|Waterloo|ndp
Mohamed Firin|York South—Weston|pc
Hon. Rob Flack|Elgin—Middlesex—London|pc
Hon. Doug Ford|Etobicoke North|pc
John Fraser|Ottawa South|olp
Jennifer K. French|Oshawa|ndp
Dawn Gallagher Murphy|Newmarket—Aurora|pc
Wayne Gates|Niagara Falls|ndp
France Gélinas|Nickel Belt|ndp
Alexa Gilmour|Parkdale—High Park|ndp
Chris Glover|Spadina—Fort York|ndp
Lisa Gretzky|Windsor West|ndp
Hardeep Singh Grewal|Brampton East|pc
Silvia Gualtieri|Mississauga East—Cooksville|pc
Hon. Zee Hamid|Milton|pc
Hon. Ernie Hardeman|Oxford|pc
Hon. Mike Harris|Kitchener—Conestoga|pc
Andrea Hazell|Scarborough—Guildwood|olp
Hon. Kevin Holland|Thunder Bay—Atikokan|pc
Ted Hsu|Kingston and the Islands|olp
Hon. Sylvia Jones|Dufferin—Caledon|pc
Hon. Trevor Jones|Chatham-Kent—Leamington|pc
John Jordan|Lanark—Frontenac—Kingston|pc
Logan Kanapathi|Markham—Thornhill|pc
Terence Kernaghan|London North Centre|ndp
Hon. Michael S. Kerzner|York Centre|pc
Hon. Andrea Khanjin|Barrie—Innisfil|pc
Hon. Natalia Kusendova-Bashta|Mississauga Centre|pc
Susan Lahey|York—Simcoe|pc
Anthony Leardi|Essex|pc
Hon. Stephen Lecce|King—Vaughan|pc
Robin Lennox|Hamilton Centre|ndp
Sol Mamakwa|Kiiwetinoong|ndp
Hon. Todd J. McCarthy|Durham|pc
Karen McCrimmon|Kanata—Carleton|olp
Hon. Graham McGregor|Brampton North|pc
Catherine McKenney|Ottawa Centre|ndp
Mary-Margaret McMahon|Beaches—East York|olp
Hon. Sam Oosterhoff|Niagara West|pc
Billy Pang|Markham—Unionville|pc
Hon. Michael Parsa|Aurora—Oak Ridges—Richmond Hill|pc
Chandra Pasma|Ottawa West—Nepean|ndp
Hon. David Piccini|Northumberland—Peterborough South|pc
Natalie Pierre|Burlington|pc
Steve Pinsonneault|Lambton—Kent—Middlesex|pc
Hon. George Pirie|Timmins|pc
Hon. Nolan Quinn|Stormont—Dundas—South Glengarry|pc
Joseph Racinsky|Wellington—Halton Hills|pc
Hon. Matthew Rae|Perth—Wellington|pc
Tom Rakocevic|Humber River—Black Creek|ndp
Hon. Greg Rickford|Kenora—Rainy River|pc
Brian Riddell|Cambridge|pc
Bill Rosenberg|Algoma—Manitoulin|pc
Sheref Sabawy|Mississauga—Erin Mills|pc
Amarjot Sandhu|Brampton West|pc
Hon. Prabmeet Singh Sarkaria|Brampton South|pc
Stéphane Sarrazin|Glengarry—Prescott—Russell|pc
Peggy Sattler|London West|ndp
Hon. Brian Saunderson|Simcoe—Grey|pc
Mike Schreiner|Guelph|gpo
Chris Scott|Sault Ste. Marie|ind
Hon. Laurie Scott|Haliburton—Kawartha Lakes—Brock|pc
Fatima Shaban|Scarborough Southwest|ndp
Adil Shamji|Don Valley East|olp
Sandy Shaw|Hamilton West—Ancaster—Dundas|ndp
Hon. Donna Skelly|Flamborough—Glanbrook|pc
Dave Smith|Peterborough—Kawartha|pc
David Smith|Scarborough Centre|pc
Hon. Graydon Smith|Parry Sound—Muskoka|pc
Laura Smith|Thornhill|pc
Stephanie Smyth|Toronto—St. Paul's|olp
Jennifer (Jennie) Stevens|St. Catharines|ndp
Marit Stiles|Davenport|ndp
Hon. Kinga Surma|Etobicoke Centre|pc
Peter Tabuns|Toronto—Danforth|ndp
Hon. Nina Tangri|Mississauga—Streetsville|pc
Hon. Vijay Thanigasalam|Scarborough—Rouge Park|pc
Hon. Lisa M. Thompson|Huron—Bruce|pc
Hon. Michael A. Tibollo|Vaughan—Woodbridge|pc
Effie J. Triantafilopoulos|Oakville North—Burlington|pc
Jonathan Tsao|Don Valley North|olp
John Vanthof|Timiskaming—Cochrane|ndp
Lise Vaugeois|Thunder Bay—Superior North|ndp
Paul Vickers|Bruce—Grey—Owen Sound|pc
Daisy Wai|Richmond Hill|pc
Tyler Watt|Nepean|olp
Jamie West|Sudbury|ndp
Hon. Charmaine A. Williams|Brampton Centre|pc
Kristyn Wong-Tam|Toronto Centre|ndp`;
