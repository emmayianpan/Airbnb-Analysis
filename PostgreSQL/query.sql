CREATE TABLE summary AS(
	SELECT*FROM sf
	UNION
	SELECT*FROM nyc
	UNION
	SELECT*FROM la
	UNION
	SELECT*FROM hi
	UNION
	SELECT*FROM bc
	UNION
	SELECT*FROM bos
	UNION
	SELECT*FROM nsh
	UNION
	SELECT*FROM chi
	UNION
	SELECT*FROM colo
	UNION
	SELECT*FROM den
); 

COPY (SELECT*FROM summary) 
	To 'C:\Users\emmayianpan\Desktop\Github Repo\Airbnb-Analysis\static\data\summary.csv' 
	With CSV DELIMITER ',' HEADER;