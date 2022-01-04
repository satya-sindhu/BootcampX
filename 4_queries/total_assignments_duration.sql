SELECT day, count(*) as number_of_assignments, sum(duration) as suration
FROM assignments
GROUP BY day 
ORDER BY day;