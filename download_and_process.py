import os
import sys
import subprocess
import shutil
from urllib.parse import urlparse

def main(url, webdav_credentials):
    temp_dir = "temp_downloads"
    os.makedirs(temp_dir, exist_ok=True)

    if "youtube.com" in url or "music.youtube.com" in url:
        is_playlist = "playlist" in url

        if is_playlist:
            cmd = f"yt-dlp -o '{temp_dir}/%(playlist)s/%(title)s.%(ext)s' -i --yes-playlist {url}"
        else:
            cmd = f"yt-dlp -o '{temp_dir}/%(title)s.%(ext)s' {url}"

        subprocess.run(cmd, shell=True, check=True)
    else:
        file_name = os.path.join(temp_dir, os.path.basename(urlparse(url).path))
        cmd = f"wget -O {file_name} {url}"
        subprocess.run(cmd, shell=True, check=True)

    upload_to_webdav(temp_dir, webdav_credentials)
    shutil.rmtree(temp_dir)

def upload_to_webdav(directory, credentials):
    from webdav3.client import Client
    from webdav3.exceptions import WebDavException

    options = {
        'webdav_hostname': credentials.splitlines()[0],
        'webdav_login': credentials.splitlines()[1],
        'webdav_password': credentials.splitlines()[2]
    }

    client = Client(options)

    for root, _, files in os.walk(directory):
        for file in files:
            local_path = os.path.join(root, file)
            remote_path = os.path.join(root.replace(directory, ''), file)

            try:
                client.upload_sync(remote_path=remote_path, local_path=local_path)
            except WebDavException as e:
                print(f"Failed to upload {local_path}: {e}")

if __name__ == "__main__":
    url = sys.argv[1]
    webdav_credentials = sys.argv[2]
    main(url, webdav_credentials)
