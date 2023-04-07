// Midnight.swift

import Foundation

@objc(Midnight)
class Midnight: RCTEventEmitter {
    // MARK: RN Exposed Methods
    @objc func triggerDayChangedEvent() {
        NotificationCenter
            .default
            .post(.init(name: .NSCalendarDayChanged))
    }

    // MARK: RN Exposed Methods
    @objc func triggerHourChangedEvent() {
        NotificationCenter
            .default
            .post(.init(name: .NSSystemClockDidChange))
    }

    // MARK: Private Methods
    @objc private func sendDayChangedEvent() {
        sendEvent(withName: "Midnight_dayChanged", body: nil)
    }

    // MARK: Private Methods
    @objc private func sendHourChangedEvent() {
        sendEvent(withName: "Midnight_hourChanged", body: nil)
    }

    // MARK: RCTEventEmitter Methods
    @objc override func startObserving() {
        NotificationCenter
            .default
            .addObserver(self, selector: #selector(sendDayChangedEvent), name: .NSCalendarDayChanged, object: nil)
        
        NotificationCenter
            .default
            .addObserver(self, selector: #selector(sendHourChangedEvent), name: .NSSystemClockDidChange, object: nil)
    }

    @objc override func stopObserving() {
        NotificationCenter
            .default
            .removeObserver(self, name: .NSCalendarDayChanged, object: nil)
        
        NotificationCenter
            .default
            .removeObserver(self, name: .NSSystemClockDidChange, object: nil)
    }

    @objc override func supportedEvents() -> [String]! {
        ["Midnight_dayChanged", "Midnight_hourChanged" ]
    }
}
