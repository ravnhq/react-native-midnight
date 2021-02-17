// Midnight.swift

import Foundation

@objc(Midnight)
class Midnight: RCTEventEmitter {
    // MARK: RN Exposed Methods
    @objc func postNotification() {
        NotificationCenter
            .default
            .post(.init(name: .NSCalendarDayChanged))
    }

    // MARK: Private Methods
    @objc private func sendDayChangedEvent() {
        sendEvent(withName: "dayChanged", body: nil)
    }

    // MARK: RCTEventEmitter Methods
    @objc override func startObserving() {
        NotificationCenter
            .default
            .addObserver(self, selector: #selector(sendDayChangedEvent), name: .NSCalendarDayChanged, object: nil)
    }

    @objc override func stopObserving() {
        NotificationCenter
            .default
            .removeObserver(self, name: .NSCalendarDayChanged, object: nil)
    }

    @objc override func supportedEvents() -> [String]! {
        ["dayChanged"]
    }
}
