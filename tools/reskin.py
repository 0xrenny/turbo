#!/usr/bin/env python3
"""Usage: python3 tools/reskin.py --name PEPE --ticker '$PEPE' --image /path/logo.png [--accent '#33ff99'] [--tagline '...'] [--ca 0x...]
Copies the image into assets/ and rewrites the matching fields in config.js. Jokes still mention 'frog' - edit config.js copy afterwards."""
import argparse,json,re,shutil,os
p=argparse.ArgumentParser();p.add_argument('--name',required=True);p.add_argument('--ticker',required=True);p.add_argument('--image',required=True)
p.add_argument('--accent');p.add_argument('--tagline');p.add_argument('--ca')
a=p.parse_args();root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ext=os.path.splitext(a.image)[1] or '.png';dst=f'assets/mascot{ext}';shutil.copy(a.image,os.path.join(root,dst))
f=os.path.join(root,'config.js');s=open(f).read()
old=re.search(r'name: "(.*?)"',s).group(1)
def setk(k,v):
  global s;s=re.sub(rf'(\n  {k}: )".*?"',lambda m:m.group(1)+json.dumps(v),s,count=1)
setk('name',a.name);setk('ticker',a.ticker);setk('image',dst)
if a.tagline:setk('tagline',a.tagline)
if a.ca:setk('contract',a.ca)
if a.accent:s=re.sub(r'accent: "#\w+"',f'accent: "{a.accent}"',s,count=1)
s=s.replace(old,a.name)  # replace name mentions in jokes too
open(f,'w').write(s);print('Reskinned to',a.name,'- review config.js, then git commit && git push')
