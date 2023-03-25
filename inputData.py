import pandas as pd
import numpy as np

jira_csv = pd.read_csv('./Jira.csv')

print(jira_csv.iloc[:6])