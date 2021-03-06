import csv
import json
import pymysql
from requests.api import delete

with open("secrets.json", "r") as f:
    json_data = json.load(f)

conn = pymysql.connect(host='localhost', user='root', password=json_data['mysqlPassword'], db='manager')
curs = conn.cursor()

# Delete previous data
delete_sql = 'delete from hairshop'
curs.execute(delete_sql)
curs.fetchall()

# Insert Hairshop data
f = open("hair_data.csv", 'r', encoding='utf-8')
rd = csv.reader(f)
index = 0
for line in rd:
    if index == 0:
        index += 1
        continue
    
    if line[3]!='None' and line[4]!='None':
        check_sql = 'select * from hairshop where name = "{}" and loc_x={} and loc_y={}'.format(line[1], line[3], line[4])
    else:
        check_sql = 'select * from hairshop where name = "{}"'.format(line[1])
    if curs.execute(check_sql):
        continue

    # initial data value
    id = 'hair'+ line[0]
    password = 'hair' + line[0]
    
    i = 0
    for i in range(len(line)):
        if line[i] == 'None':
            line[i] = 'NULL'

    sql = '''insert into hairshop (shop_id, name, login_id, login_pw, address, loc_x, loc_y, score, website, contact, open_hour, photo_link) 
    values ({}, "{}", "{}", "{}", "{}", {}, {}, {}, "{}", "{}", "{}", "{}")'''.format(line[0], line[1], id, password, line[2], line[3], line[4], line[7], line[6], line[5], line[8], line[9])
    print(sql)
    curs.execute(sql)
conn.commit()
conn.close()
f.close()