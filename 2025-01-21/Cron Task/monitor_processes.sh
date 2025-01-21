#!/bin/bash

# log file path stored in LOG_FILE variable
LOG_FILE="/home/luzza/Desktop/Intern/2025-01-21/Cron Task/memory_processes.log"

# Get the date and time for logging purposes
DATE=$(date "+%Y-%m-%d %H:%M:%S")

# Append the date to the log file
echo "[$DATE] - Top 5 resource-heavy processes" >> $LOG_FILE

# Get top 5 processes by CPU and Memory usage and append to log
echo -e "Top 5 CPU-consuming processes:\n" >> $LOG_FILE
ps -eo pid,ppid,%cpu,%mem --sort=-%cpu | head -n 6 >> $LOG_FILE  

echo -e "\nTop 5 Memory-consuming processes:\n" >> $LOG_FILE
ps -eo pid,ppid,%cpu,%mem --sort=-%cpu | head -n 6 | head -n 6 >> $LOG_FILE  

echo -e "\n--------------------------------------------------------\n" >> $LOG_FILE




