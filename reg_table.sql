create table registration_town(
	id serial not null primary key,
	town_name text not null,
    starts_with text not null
);

create table registration_num (
	id serial not null primary key,
    reg_num text not null,
	category_id int,
	foreign key (category_id) references registration_town(id)
);

INSERT INTO registration_town(town_name, starts_with) VALUES('Cape Town', 'CA')
INSERT INTO registration_town(town_name, starts_with) VALUES('Bellville', 'CY')
INSERT INTO registration_town(town_name, starts_with) VALUES('Paarl', 'CJ')