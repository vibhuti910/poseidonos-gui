from datetime import date
from zipfile import ZipFile
import os
from flask import send_file
import re
from util.db.influx import get_connection
from util.macros.influxdb_config import mtool_db, infinite_rp

def zipFilesInDir(dirName, zipFileName, mode, startdate, enddate):
    # create a ZipFile object
    with ZipFile(zipFileName, mode) as zipObj:
        # Iterate over all the files in directory
        for folderName, _, filenames in os.walk(dirName):
            for filename in filenames:
                   # filenamesplit = re.split('-|\.', filename)
                   # filedate = date(int(filenamesplit[3]), int(filenamesplit[2]), int(filenamesplit[1]))
                   # if filedate >= startdate and filedate <= enddate:
                   # create complete filepath of file in directory
                filePath = os.path.join(folderName, filename)
                # Add file to zip
                zipObj.write(filePath, filePath.split("/")[-1])


def download_logs(startdate, enddate):
    startdate_split = re.split('-|T', startdate)
    startdate = date(int(startdate_split[0]), int(startdate_split[1]), int(startdate_split[2]))
    enddate_split = re.split('-|T', enddate)
    enddate = date(int(enddate_split[0]), int(enddate_split[1]), int(enddate_split[2]))
    zipFilesInDir('public/log', 'log.zip', 'w', startdate, enddate)
    zipFilesInDir('/etc/ibofos/log', 'log.zip', 'a', startdate, enddate)
    return send_file('../log.zip')

"""
def get_ibofos_logs():
    connection = get_connection()
    # query = 'SELECT mean("usage_idle") AS "mean_usage_idle" FROM "telegraf"."autogen"."cpu" WHERE time > now()-15m AND  GROUP BY time(1285ms)'
    query = 'SELECT ("value") FROM "' + mtool_db + '"."' + infinite_rp + \
        '"."rebuilding_status" order by time desc limit 100'
    res = connection.query(query)
    query = 'SELECT count("value") FROM "' + mtool_db + \
        '"."autogen"."rebuilding_status"'
    count = connection.query(query)
    connection.close()
    return res, count
"""
"""
def get_bmc_logs(page, per_page, filterSubQuery):
    offset = int(page, 10) * int(per_page, 10)
    connection = get_connection()
    query = 'SELECT * FROM "' + mtool_db + '"."' + infinite_rp + '".bmc_logs" ' + \
        filterSubQuery + 'order by time desc limit ' + per_page + ' offset ' + str(offset)
    res = connection.query(query)
    query = 'SELECT count("Timestamp") FROM "' + mtool_db + \
        '"."' + infinite_rp + '"."bmc_logs"' + filterSubQuery
    count = connection.query(query)
    query = 'SELECT distinct Source FROM "' + \
        mtool_db + '"."' + infinite_rp + '"."bmc_logs"'
    source_filter = connection.query(query)
    query = 'SELECT distinct EntryType FROM FROM "' + \
        mtool_db + '"."' + infinite_rp + '"."bmc_logs"'
    entryType_filter = connection.query(query)
    query = 'SELECT distinct Severity FROM "' + \
        mtool_db + '"."' + infinite_rp + '"."bmc_logs"'
    severity_filter = connection.query(query)
    connection.close()
    return res, count, source_filter, entryType_filter, severity_filter
"""
