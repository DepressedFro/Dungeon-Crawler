import csv

with open('riddles.txt', 'r') as in_file:
    #strip away the white space
    stripped = (line.strip() for line in in_file)
    lines = (line for line in stripped if line)
    #create groups that each have 5 lines
    grouped = zip(*[lines] * 5)
    #newline='' gets rid of the extra newline
    with open('riddles.csv', 'w', newline='') as out_file:
        writer = csv.writer(out_file)
        #write the headers
        writer.writerow(('Riddle #', 'Question', 'Correct Answer', "Fake Answer #1", "Fake Answer #2"))
        writer.writerows(grouped)

