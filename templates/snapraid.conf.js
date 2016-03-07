{% if smartd_long_test_dow == "random" %}
{%   set smartd_long_test_dow_random = true %}
{% endif %}
{% if smartd_long_test_hour == "random" %}
{%   set smartd_long_test_hour_random = true %}
{% endif %}
{% if smartd_short_test_hour == "random" %}
{%   set smartd_short_test_hour_random = true %}
{% endif %}
{% for disk in disks.stdout_lines %}
{%   if smartd_long_test_dow_random %}
{%     set smartd_long_test_dow = range(1,8)|random %}
{%   endif %}
{%   if smartd_long_test_hour_random %}
{%     set smartd_long_test_hour = range(1,24)|random %}
{%     set smartd_long_test_hour = "{0:02d}".format(smartd_long_test_hour) %}
{%   endif %}
{%   if smartd_short_test_hour_random %}
{%     set smartd_short_test_hour = range(1,24)|random %}
{%     set smartd_short_test_hour = "{0:02d}".format(smartd_short_test_hour) %}
{%   endif %}
{{ disk }} -a -o on -S on -s (S/{{ smartd_short_test_month }}/{{ smartd_short_test_dom }}/{{ smartd_short_test_dow }}/{{ smartd_short_test_hour }}|L/{{ smartd_long_test_month }}/{{ smartd_long_test_dom }}/{{ smartd_long_test_dow }}/{{ smartd_long_test_hour }}) -m bwp.pearson@gmail.com
{% endfor %}


# Example configuration for snapraid

# Defines the file to use as parity storage
# It must NOT be in a data disk
# Format: "parity FILE_PATH"
parity /mnt/parity1/parity

# Defines the files to use as additional parity storage.
# If specified, they enable the multiple failures protection
# from two to six level of parity.
# To enable, uncomment one parity file for each level of extra
# protection required. Start from 2-parity, and follow in order.
# It must NOT be in a data disk
# Format: "X-parity FILE_PATH"
#2-parity /mnt/parity2/2-parity
#3-parity /mnt/parity3/3-parity
#4-parity /mnt/parity4/4-parity
#5-parity /mnt/parity5/5-parity
#6-parity /mnt/parity6/6-parity

# Defines the files to use as content list
# You can use multiple specification to store more copies
# You must have least one copy for each parity file plus one. Some more don't hurt
# They can be in the disks used for data, parity or boot,
# but each file must be in a different disk
# Format: "content FILE_PATH"
content /root/snapraid/content
content /mnt/drive7/snapraid/content
#content /mnt/drive3/snapraid/content
content /mnt/drive4/snapraid/content
content /mnt/drive5/snapraid/content
content /mnt/drive6/snapraid/content

# Defines the data disks to use
# The order is relevant for parity, do not change it
# Format: "disk DISK_NAME DISK_MOUNT_POINT"
disk d1 /mnt/drive7/
disk d2 /mnt/drive3/
disk d3 /mnt/drive4/
disk d4 /mnt/drive5/
disk d5 /mnt/drive6/
#disk d6 /mnt/drive4/
# Excludes hidden files and directories (uncomment to enable).
nohidden

# Defines files and directories to exclude
# Remember that all the paths are relative at the mount points
# Format: "exclude FILE"
# Format: "exclude DIR/"
# Format: "exclude /PATH/FILE"
# Format: "exclude /PATH/DIR/"
exclude *.unrecoverable
exclude *.bak
exclude *.unrecoverable
exclude /tmp/
exclude /lost+found/
exclude .DS_Store
exclude .Thumbs.db
exclude Thumbs.db
exclude .wh..wh.aufs
exclude .wh..wh..opq
exclude .wh..*
exclude .fseventsd
exclude .Spotlight-V100
exclude .TemporaryItems
exclude .Trashes
exclude /lost+found/
exclude /Podcasts/*-*-*/
exclude /Podcasts/tech*/
exclude /Podcasts/Backs/
exclude *.torrent
exclude /Podcasts/musiccasts/
exclude /Podcasts/SSS/
exclude /Podcasts/youtube-dl/
exclude /Podcasts/btsync/
exclude /Podcasts/Processing/

# Defines the block size in kibi bytes (1024 bytes) (uncomment to enable).
# Default value is 256 -> 256 kibi bytes -> 262144 bytes
# Format: "block_size SIZE_IN_KiB"
#block_size 256

# Automatically save the state when synching after the specied amount
# of GiB processed (uncomment to enable).
# This option is useful to avoid to restart from scratch long 'sync'
# commands interrupted by a machine crash.
# It also improves the recovering if a disk break during a 'sync'.
# The SIZE argument is specified in gibi bytes -> 1073741824 bytes
# Default value is 0, meaning disabled.
# Format: "autosave SIZE_IN_GiB"
#autosave 500

# Defines the pooling directory where the virtual view of the disk
# array is created using the "pool" command (uncomment to enable).
# The files are not really copied here, but just linked using
# symbolic links.
# This directory must be outside the array.
# Format: "pool DIR"
#pool /pool
