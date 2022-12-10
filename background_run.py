import win32gui
import win32con
import pygetwindow as gw
from time import sleep

def callback(handle, param):
    s = win32gui.GetClassName(handle)
    try:
        print(f'Sending key to {handle}, {s}')
        win32gui.SendMessage(handle, win32con.WM_KEYDOWN, win32con.VK_NEXT, 0)
        win32gui.SendMessage(handle, win32con.WM_KEYUP, win32con.VK_NEXT, 0)
        sleep(2)
    except Exception:
        print('Exception sending to {handle}, {s}')

def send_page_down(handle, param):
    print(win32gui.GetClassName(handle))
    print(param)
    if win32gui.GetClassName(handle) == param:
        win32gui.SendMessage(handle, win32con.WM_KEYDOWN, win32con.VK_NEXT, 0)
        win32gui.SendMessage(handle, win32con.WM_KEYUP, win32con.VK_NEXT, 0)

alltitles = gw.getAllTitles()
# for t in alltitles:
#     print(t)
window_id = win32gui.FindWindow(None, "CSDN - 专业开发者社区 和其他 13 個頁面 - 個人 - Microsoft​ Edge")
win32gui.EnumChildWindows(window_id, callback, 0)

print(window_id)
# win32gui.EnumChildWindows(window_id, send_page_down, 'FoxitDocWnd')